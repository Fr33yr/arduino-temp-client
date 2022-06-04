import { useState, useEffect } from "react";



const today = new Date()

let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

let TODAY = yyyy+"-"+mm+"-"+dd;


export function useQuery() {

}