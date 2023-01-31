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


const OutletsList = () => {
    return <div className="container">
        <h1>Outlets List</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th
                        scope="col"
                    >Score
                    </th>
                </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>1</td>
                            <td>KFC</td>
                            <td>3.2</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>McDonald's</td>
                            <td>4.2</td>
                        </tr>
                </tbody>
            </table>
    </div>
}

export default OutletsList;
