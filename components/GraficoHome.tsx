'use client'
import React, {useState, Fragment, useEffect} from 'react'
import dynamic from 'next/dynamic';
import { format, subDays, subWeeks } from 'date-fns';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { GetData } from '@/functions/GetData';


type moeda = {
    code: string;
    codein: string;
    high: string;
    low: string;
    timestamp: string;
}



const moedas: any = [
        {
        id: 1,
        name: "United States Dollar",
        sigla: "USD"
        },
        {
        id: 2,
        name: "Euro",
        sigla: "EUR"
        },
        {
        id: 3,
        name: "British Pound Sterling",
        sigla: "GBP"
        },
        {
        id: 4,
        name: "Japanese Yen",
        sigla: "JPY"
        },
        {
        id: 5,
        name: "Canadian Dollar",
        sigla: "CAD"
        },
        {
        id: 6,
        name: "Australian Dollar",
        sigla: "AUD"
        },
        {
        id: 7,
        name: "Swiss Franc",
        sigla: "CHF"
        },
        {
        id: 8,
        name: "Swedish Krona",
        sigla: "SEK"
        },
        {
        id: 9,
        name: "Mexican Peso",
        sigla: "MXN"
        },
        {
        id: 10,
        name: "Chinese Renminbi",
        sigla: "CNY"
        },
        {
        id: 11,
        name: "Indian Rupee",
        sigla: "INR"
        },
        {
        id: 12,
        name: "Singapore Dollar",
        sigla: "SGD"
        },
        {
        id: 13,
        name: "Argentine Peso",
        sigla: "ARS"
        },
        {
        id: 14,
        name: "South African Rand",
        sigla: "ZAR"
        },
        {
        id: 15,
        name: "New Zealand Dollar",
        sigla: "NZD"
        },
        {
        id: 16,
        name: "Kuwaiti Dinar",
        sigla: "KWD"
        },
        {
        id: 17,
        name: "Brazil Real",
        sigla: "BRL"
        }
  ]
  
  


const GraficoHome = () => {
    const [selected, setSelected] = useState(moedas[0])
    const [selected2, setSelected2] = useState(moedas[1])
    const [query, setQuery] = useState('')
    const [data2, setData2] = useState<moeda[]>([])
    const [DaysLast, setDaysLast] = useState<string[]>([])
    const [DaysApi, setDaysApi] = useState<number>(15)

    
    function getFormattedDatesFromLastNDays(N: number) {
        const formattedDates = [];
        
        
        for (let i = 0; i < N; i++) {
            const date = subDays(new Date(), i);
            const formattedDate = format(date, 'dd MMM');
            formattedDates.push(formattedDate);
        }
             
        setDaysLast(formattedDates);
    }

  
    useEffect(() => {
        GetData(selected['sigla'], selected2['sigla'], DaysApi).then(response => {
        
          setData2(response)
        });  
    },[selected,selected2,DaysApi])

    const handleSelecaoComboBox1 = (valor: any) => {
        console.log(valor)
        // Verifique se o valor já foi selecionado em ComboBox2
        if (valor['sigla'] !== selected2['sigla']) {
            setSelected(valor);
        } else {
          // Valor já selecionado em ComboBox2, pode exibir uma mensagem de erro ou tomar outra ação apropriada.
          alert('Este valor já foi selecionado em ComboBox2');
        }
    };
    
    const handleSelecaoComboBox2 = (valor:any) => {
        // Verifique se o valor já foi selecionado em ComboBox1
        if (valor['sigla'] !== selected['sigla']) {
            setSelected2(valor);
        } else {
            // Valor já selecionado em ComboBox1, pode exibir uma mensagem de erro ou tomar outra ação apropriada.
            alert('Este valor já foi selecionado em ComboBox1');
        }
    };

    const filteredMoedas=
      query === ''
        ? moedas
        : moedas.filter((person: any) =>
   
            person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
  


    // Função para obter datas formatadas nos últimos 1 mês
    function getFormattedDatesFromLast15Days() {
        setDaysApi(15)
        return getFormattedDatesFromLastNDays(15); // Aproximadamente 30 dias em um mês
    }

    // Função para obter datas formatadas nos últimos 1 mês
    function getFormattedDatesFromLastMonth() {
        setDaysApi(30)
        return getFormattedDatesFromLastNDays(30); // Aproximadamente 30 dias em um mês
    }
    
    // Função para obter datas formatadas nos últimos 6 meses
    function getFormattedDatesFromLast3Months() {
        setDaysApi(90)
        return getFormattedDatesFromLastNDays(90); // Aproximadamente 180 dias em seis meses
    }
  


    const data = data2.map((item) => parseFloat(item.high));

    const Json =  {
        series: [
            {
                name: selected2['sigla'],
                data: data.reverse()
            }
        ]
    }


    JSON.stringify(Json)
    console.log(JSON.stringify(Json))


    const OptionsChart = {
        title:{ text: selected['sigla'] + ' x ' + selected2['sigla']},
        xaxis:{
            categories: DaysLast.reverse(),
            labels: {
                style: {
                  fontSize: '11px', // Ajuste o tamanho da fonte conforme necessário
                },
              },
        },
        yaxis:{
            opposite: true
                     
        },
        tooltip: {
            enabled: true,
            theme: 'dark'
        },
        chart: {
            foreColor: 'white'
        },
        markers: {
            size: 4,
            strokeWidth: 2,
            strokeColor: '#ffd'
        },
        grid: {
            show: true
        }
    }
  
  return (
    <>
    <div className='mx-auto max-w-3xl px-6 lg:px-8 sm:text-center justify-between flex '>
    <Combobox value={selected} onChange={handleSelecaoComboBox1}>
        <div className="relative mt-1">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                    className="w-full border-none  py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    displayValue={(person: any) => person.name}
                    onChange={(event) => setQuery(event.target.value)} />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true" />
                </Combobox.Button>
            </div>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
            >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full  z-50 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {filteredMoedas.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                        </div>
                    ) : (
                        filteredMoedas.map((person: any) => (
                            <Combobox.Option
                                key={person.id}
                                className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 z-50 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'}`}
                                value={person}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                        >
                                            {person.name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Combobox.Option>
                        ))
                    )}
                </Combobox.Options>
            </Transition>
        </div>
      </Combobox>
      <Combobox value={selected2} onChange={handleSelecaoComboBox2}>
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="w-full border-none  py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(person: any) => person.name}
                        onChange={(event) => setQuery(event.target.value)} />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true" />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full z-50 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredMoedas.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredMoedas.map((person: any) => (
                                <Combobox.Option
                                    key={person.id}
                                    className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 z-50 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'}`}
                                    value={person}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
        </div>
        <Chart options={OptionsChart} series={Json.series} type="line" width={'100%'} height={'300%'} />
        <div className='flex w-full items-center justify-center mt-2 '>
            <button onClick={getFormattedDatesFromLast15Days} className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-s">
            15 Days
            </button>
            <button onClick={getFormattedDatesFromLastMonth}  className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent ">
            1 Month
            </button>
            <button onClick={getFormattedDatesFromLast3Months}  className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent ">
            3 Month
            </button>
           
        </div>
    </>
    )
}

export default GraficoHome