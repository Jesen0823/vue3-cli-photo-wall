import { ref, reactive } from 'vue'

export const DataState = {
  LOADING: 'loading',
  EMPTY: 'empty',
  NODATA: 'empty',
  NORMAL: 'normal',
  NOMORE: 'noMore'
}

export function useWallData() {
  const cache = reactive(new Map())
  const pageCache = reactive(new Map())
  const loading = ref(false)
  const state = ref(DataState.LOADING)
  const currentCategoryId = ref(-1)
  const curPage = ref(1)
  const pageSize = 8

  const setLoading = (value) => {
    loading.value = value
    if (value) {
      state.value = DataState.LOADING
    }
  }

  const setEmpty = () => {
    state.value = DataState.EMPTY
    loading.value = false
  }

  const setNormal = () => {
    state.value = DataState.NORMAL
    loading.value = false
  }

  const setNoMore = () => {
    state.value = DataState.NOMORE
    loading.value = false
  }

  const getCategoryCache = (categoryId) => {
    if (!cache.has(categoryId)) {
      cache.set(categoryId, ref([]))
      pageCache.set(categoryId, 1)
    }
    return cache.get(categoryId)
  }

  const getCategoryPage = (categoryId) => {
    return pageCache.get(categoryId) || 1
  }

  const setCategoryPage = (categoryId, page) => {
    pageCache.set(categoryId, page)
  }

  const updateCategoryData = (categoryId, newData, isConcat = false) => {
    const cachedData = getCategoryCache(categoryId)
    if (isConcat) {
      cachedData.value = cachedData.value.concat(newData)
    } else {
      cachedData.value = newData
    }
  }

  const hasCategoryData = (categoryId) => {
    const cached = getCategoryCache(categoryId)
    return cached.value && cached.value.length > 0
  }

  const switchCategory = async (categoryId, fetchFn) => {
    if (currentCategoryId.value === categoryId) return

    currentCategoryId.value = categoryId
    curPage.value = 1

    if (hasCategoryData(categoryId)) {
      setNormal()
      return
    }

    setLoading(true)
    await fetchFn(categoryId, 1)
  }

  const loadMore = async (fetchFn) => {
    if (loading.value || state.value === DataState.NOMORE) return

    const nextPage = getCategoryPage(currentCategoryId.value)
    setLoading(true)
    await fetchFn(currentCategoryId.value, nextPage)
  }

  const refresh = async (fetchFn) => {
    const categoryId = currentCategoryId.value
    updateCategoryData(categoryId, [], false)
    curPage.value = 1
    setLoading(true)
    await fetchFn(categoryId, 1)
  }

  const incrementPage = () => {
    const currentPage = getCategoryPage(currentCategoryId.value)
    setCategoryPage(currentCategoryId.value, currentPage + 1)
    curPage.value = currentPage + 1
  }

  const resetPage = () => {
    setCategoryPage(currentCategoryId.value, 1)
    curPage.value = 1
  }

  return {
    state,
    loading,
    currentCategoryId,
    curPage,
    pageSize,
    cache,
    setLoading,
    setEmpty,
    setNormal,
    setNoMore,
    getCategoryCache,
    getCategoryPage,
    setCategoryPage,
    updateCategoryData,
    hasCategoryData,
    switchCategory,
    loadMore,
    refresh,
    incrementPage,
    resetPage
  }
}
