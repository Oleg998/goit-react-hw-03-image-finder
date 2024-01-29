import axios from "axios";

const instance= axios.create (
    {
        baseURL:"https://pixabay.com/api"
    }
) 

  const params = new URLSearchParams({
    key: `40926027-5cb2084dfcf445810afb57cb9`,
    q: `cat`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 12,
  });


export const searceImg =() =>{
    return instance.get(`/`, { params });
}