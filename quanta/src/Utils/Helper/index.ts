import moment from "moment"

export const getDisplayTimeFromMoment = (date) => {
    if (date) {
        return moment(date).format('LT')
    }
    else{
        return '-'
    }

}

export const getDisplayDateFromMoment = (date) => {
    if (date) {
        return moment(date).format('ll')
    }
    else{
        return '-'
    }

}

export const getDisplayDateWithTimeFromMoment = (date) => {
    if (date) {
        return moment(date).format('lll')
    }
    else{
        return '-'
    }

}
