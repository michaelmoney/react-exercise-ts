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

const OutletsList = () => {
    return (
        <div className="container">
            <h1>Food Outlets List</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Score</th>
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
    );
};

export default OutletsList;
