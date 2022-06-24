import axios from '@/utils/axios'

function search(text, size = 10, from = 0) {
    return axios.get(
        `/-/v1/search?text=${text}&size=${size}&from=${from}`
    );
}

export default {
    search
}
