import axios from "axios";

export const userReguser = (data:object) => {
    return axios({
      url: '/api/reguser',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data
    })
  }
