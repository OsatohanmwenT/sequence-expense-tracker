import {useEffect, useState} from 'react'
import {Category} from "@/lib/entities";
import {fetchCategory} from "@/lib/actions/category.actions";

const UseCategories = () => {
    const [categories, setCategories] = useState<Category[] | undefined>([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetchCategory()
                setCategories(data)
            } catch (error: any) {
                console.error(error.detail)
            }
        }
        fetchCategories()
    },[])

    return (categories)
}
export default UseCategories
