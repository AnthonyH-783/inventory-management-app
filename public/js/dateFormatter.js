import {formatDistanceToNow} from "date-fns";

export function formatLastUpdated(dateStr){
    if(!dateStr) return;
    const date = new Date(dateStr);
    const formatted = formatDistanceToNow(date);
    return formatted;

}