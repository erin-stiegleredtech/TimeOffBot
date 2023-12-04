function isDateValid(dateInput: string): boolean {
    const dateObj = new Date(dateInput)
    const dateNum = dateObj.getTime();
    return !isNaN(dateNum);
};

function isInFuture(dateInput: string): boolean {
    const dateObj = new Date(dateInput);
    const currentDate = new Date();

    const isFutureDate = currentDate < dateObj;

    return isFutureDate;

}

export function validateDate(dateInput: string):boolean {
  const isFormat = isDateValid(dateInput);
  const isFuture= isInFuture(dateInput);

  let isValidated: boolean;

  if(!isFormat || !isFuture){
    isValidated = false;
  } else {
    isValidated = true;
  }

  return isValidated;

}