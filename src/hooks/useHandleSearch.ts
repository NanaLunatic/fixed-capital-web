import { ref, onMounted } from "vue"

type OptionValue = string | number

/** Select 需要的数据格式 */
interface SelectOption {
  value: OptionValue
  label: string
  disabled?: boolean
}

/** 接口响应格式 */
type ApiData = ApiResponseData<SelectOption[]>

/** 入参格式，暂时只需要传递 api 函数即可 */
interface FetchSearchProps {
  api: () => Promise<ApiData>
  options: Object
}

export function useFetchSearch(props: FetchSearchProps) {
  const { api, options } = props

  const loading = ref<boolean>(false)
  const searchData = ref()
  const tableData = ref()

  /** 调用接口获取数据 */
  const querySearch = (page: Number, size: Number, search?: any | null ) => {
    loading.value = true
    let params = {
      page: page || page === 0 ? page : options.currentPage - 1,
      size: size ? size : options.pageSize,
    }
    // 重置
    if(page === 0){
      options.currentPage = 1
      options.pageSize = size
    }
    if(search){
      params = {
        ...params,
        ...JSON.parse(JSON.stringify(search)),
      }

      // 将数组转字符串
      for(let key in params){
        if(Array.isArray(params[key])){
          params[key + 'Start'] = params[key][0]
          params[key + 'End'] = params[key][1]
          delete params[key]
        }
      }
    }
    searchData.value = JSON.stringify(params)
    api(params).then((res) => {
      options.total = res.totalElements
      tableData.value = res.content
      loading.value = false
    })
  }

  return {
    options,
    searchData,
    tableData,
    querySearch
  }
}
