import axios from "axios";

export default class SearchApiService {
    constructor() { 
        this.baseUrl = "https://pixabay.com/api/";
        this.apiKey = "33826333-8ed58ef37d24ee746ab39c4fa";
        this.searchName = "";
        this.imageType = "photo";
        this.orientation = "horizontal";
        this.safesearch = true;
        this.page = 1;
        this.perPage = 40;
    }

    async getImages() {
        const url = `${this.baseUrl}?key=${this.apiKey}&q=${this.searchName}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safesearch}&page=${this.page}&per_page=${this.perPage}`;
    
        return await axios.get(url).then(response => { 
            if (response.status !== 200 || response.data.hits.length === 0) { 
                throw new Error(response.status)
            }
            
            this.nextPage();
            return response.data
        })
    }
    
    nextPage() { 
        this.page += 1;
    }

    resetPage() { 
        this.page = 1;
    }

    changeSearchName(newQuery) { 
        this.searchName = newQuery;
    }
 }

