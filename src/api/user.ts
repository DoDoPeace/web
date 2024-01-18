import axios from "axios";

export const userQuery = (data:object) => {
    return axios({
      url: '/api/reguser',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data
    })
  }
