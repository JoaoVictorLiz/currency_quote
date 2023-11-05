import { api } from "@/app/api/api";

export async function GetData(moeda1: string ,moeda2: string) {
    try {
        return await api.get(`/daily/${moeda1}-${moeda2}/15`)
        .then(Response => {
          
            return Response.data;
        }).catch(error => {
            console.log('CAIU NO ERRO: ' , error.response?.data?.message)
            return error.response?.data;
        })
    } catch (error) {
        console.log('ERRO: ', error)
    }
   
}