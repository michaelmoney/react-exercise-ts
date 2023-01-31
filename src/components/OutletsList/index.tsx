import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

/*

1. Display in OutletsList component a list of Food Outlets for the Huston city from page no. 1 by utilizing below API when components

GET request https://jsonmock.hackerrank.com/api/food_outlets?city=Houston&page=1
returns data associated with city Houston, and on the first page of the results.

Example of the JSON output:

{
    "city": "Houston",
    "name": "Cocoa Tree",
    "estimated_cost": 10,
    "user_rating": {
        "average_rating": 4.5,
        "votes": 969
    },
    "id": 938
},

2. Sort results descending using "average_rating" field (highest score at the top)

3. Add toggle button that allows switching sorting order (ascending/descending)

4. Display in OutletsList component a list of Food Outlets for the Huston city from all available pages

*/


interface ApiResponse {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: Outlets[]
}

type Outlets =  {
    id: string;
    city: string;
    name: string;
    estimated_cost: number;
    user_rating: { average_rating: number; votes: number}
}

type SortingDirection = 'ASC' | 'DESC';



const OutletsList = () => {
    const [outlets, setOutlets] = useState<Outlets[] | null>(null);
    const [sortingDirection, setSortingDirection] = useState<SortingDirection>('ASC');
    const sortingFunction = (a: Outlets, b: Outlets) => {
        if (sortingDirection === 'ASC') {
            return b.user_rating.average_rating - a.user_rating.average_rating;
        } else if (sortingDirection === 'DESC') {
            return a.user_rating.average_rating - b.user_rating.average_rating;
        }
        return 0;
    }
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response: AxiosResponse<ApiResponse> = await axios.get("https://jsonmock.hackerrank.com/api/food_outlets?city=Houston");
                const { data } = response;
                const pageCount = data.total_pages;
                let allPages: Outlets[] = [];
/*
                for (let i = 1; i <= pageCount; i++) {
                    const response: AxiosResponse<ApiResponse> = await axios.get(`https://jsonmock.hackerrank.com/api/food_outlets?city=Houston&page=${i}`);
                    const {data} = response;
                    allPages = [...allPages, ...data.data];
                }
                setOutlets(allPages);
*/
                let allPromises: Promise<ApiResponse>[] = [];
                for (let i = 1; i <= pageCount; i++) {
                    const responsePromise: Promise<ApiResponse> = fetch(`https://jsonmock.hackerrank.com/api/food_outlets?city=Houston&page=${i}`).then((response) => response.json());
                    allPromises.push(responsePromise)
                }

                Promise.all(allPromises).then(outlets => {
                    setOutlets(outlets.flatMap(outlet => outlet.data));
                })


            } catch(e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);

    const handleSorting = () => {
        sortingDirection === 'ASC' ? setSortingDirection('DESC') : setSortingDirection('ASC');
        const sorted = [...outlets!].sort(sortingFunction)
        setOutlets(sorted);
    }

    return <div className="container">
        <h1>Outlets List</h1>
        {!outlets && <>Loading...</>}
        {outlets &&
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th
                        scope="col"
                        onClick={handleSorting}
                    >Score
                    </th>
                </tr>
                </thead>
                <tbody>
                {outlets ? outlets.map((outlet) => {
                    return (
                        <tr key={outlet.id}>
                            <td>{outlet.id}</td>
                            <td>{outlet.name}</td>
                            <td>{outlet.user_rating.average_rating}</td>
                        </tr>
                    );
                }) : <>Loading...</>
                }
                </tbody>
            </table>
        }
    </div>
}

export default OutletsList;
