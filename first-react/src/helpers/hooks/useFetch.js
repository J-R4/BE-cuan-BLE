import { useState, useEffect } from 'react'

export default function useFetch(url) {
  const { data, setData } = useState([])
  const { loading, setLoading } = useState(false)
  const { error, setError } = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => //ini hanya untuk nge test ngeliat loadingnya
      fetch(url)
        .then((res) => res.json())
        .then(data => {
          setUsers(data)
        })
        .catch(err => setError(err))
        .finally(() => setLoading(false))
      , 2000)
  }, [])

  return (
    data,
    loading,
    error
  )
}