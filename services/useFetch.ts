// fetch

import { useEffect, useState } from "react";

//T là kiểu dữ liể bất kỳ , ví dụ nếu fetch danh sách phim thì T là Movie[]
// nếu fetch chi tiết phim thì T là MovieDetail
const useFecth =<T>(fecthFunction :()=> Promise<T>, autoFetch = true) =>{
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null);
            const result = await fecthFunction();
        }catch (err){
            // kiểm tra err có phải đối tượng thuộc class Error
            setError(err instanceof Error ? err : new Error("An unknown error occurred"));
        } finally{
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    };
    useEffect(() => {
        if(autoFetch){
            fetchData();
        }
    }, []);

        return { data, loading, error, refetch: fetchData , reset};

}

export default useFecth;