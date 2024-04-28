
export const prepareFormData = (data:any) => {
  let formBody:any = [];
  for (const property in data) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  return formBody;
}

export const registerFeedback = (message:string, color='info') => {
  localStorage.setItem('feedback', JSON.stringify({message, color}));
}