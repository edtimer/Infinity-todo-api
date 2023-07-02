export default function addMonths(after = 1, now = new Date()) {
    var current;
    if (now.getMonth() == 11) {
        current = new Date(now.getFullYear() + 1, 0, 1);
    } else {
        current = new Date(now.getFullYear(), now.getMonth() + 1, 1);            
    }
    return (after == 1) ? current : addMonths(after - 1, new Date(now.getFullYear(), now.getMonth() + 1, 1))
}