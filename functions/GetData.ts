import { api } from "@/app/api/api";

export async function GetData(moeda1: string ,moeda2: string, Days: number) {
    try {
        return await api.get(`/daily/${moeda1}-${moeda2}/${Days}`)
        .then(Response => {
          
            return Response.data;
        }).catch(error => {
            console.log('CAIU NO ERRO: ' , error.response?.data?.message)
            return []
        })
    } catch (error) {
        console.log('ERRO: ', error)
    }
   
}