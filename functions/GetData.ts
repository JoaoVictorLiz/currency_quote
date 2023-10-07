import { api } from "@/app/api/api";


export async function GetData() {
    try {
        return await api.get('/last/USD-BRL,EUR-BRL,BTC-BRL')
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