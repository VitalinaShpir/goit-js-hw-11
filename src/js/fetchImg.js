export async function fetchImages(value, page = 1){
    const searchParams = new URLSearchParams({
      key: '36895076-5934d2f855119bc6ea2b7e918',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q: value,
      page: page,
      per_page: 40
    });
  
    return await axios
    .get(`https://pixabay.com/api/?${searchParams}`);   
  }