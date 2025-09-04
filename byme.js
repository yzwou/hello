const versions = [];
for (let i = 9; i >= 1; i--) {
    versions.push(`1.21.${i}`)
}
versions.push(`1.21`)
for (let i = 6; i >= 1; i--) {
    versions.push(`1.20.${i}`)
}
versions.push(`1.20`)
for (let i = 4; i >= 1; i--) {
    versions.push(`1.19.${i}`)
}
versions.push(`1.19`)
for (let i = 2; i >= 1; i--) {
    versions.push(`1.18.${i}`)
}
versions.push(`1.18`)
versions.push(`1.17.1`)
versions.push(`1.17`)
for (let i = 5; i >= 1; i--) {
    versions.push(`1.16.${i}`)
}
versions.push(`1.16`)
versions.push(`1.15.2`)
versions.push(`1.15.1`)
versions.push(`1.15`)
for (let i = 4; i >= 1; i--) {
    versions.push(`1.14.${i}`)
}
versions.push(`1.14`)


const select = document.getElementById("version");
// 保留原来的“不限”
let optionsHtml = '<option value="">不限</option>';
versions.forEach(v => {
    optionsHtml += `<option value="${v}">${v}</option>`;
});

select.innerHTML = optionsHtml;
