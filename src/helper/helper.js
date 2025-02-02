import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios'


//Returns number of questions attempted
export function attempts_Number(result) {
    return result.filter(r => r !== undefined).length;
}

//Returns total points earned
export function earnPoints_Number(result, answers, point) {
    return result.map((element, i) => answers[i] === element)
            .filter(i => i).map(i => point).reduce((prev, curr) => prev + curr, 0);
}

//Returns boolean whether Passed or Failed
export function flagResult(totalPoints, earnPoints) {
    return (totalPoints * 50 / 100) < earnPoints; // earn 50% marks
}

// Check user auth
export function CheckUserExist({ children }) {
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

// Get server data
export async function getServerData(url) {
    let response = await fetch(url, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

// Post server data */
export async function postServerData(url, result, callback) {
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback(data) : data;
}