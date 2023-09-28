import { get } from "mongoose";
import Cinema from "../model/cinemaSchema.js";

 function getAll(name:string) {
    return Cinema.findOne({ name: name }).then((doc) => {
      // Return the cinema info as JSON
      return doc;
    });
  };


  export default  getAll;