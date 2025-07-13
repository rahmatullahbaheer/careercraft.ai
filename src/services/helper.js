// import useToaster from "../src/hooks/useToaster";

export function handleAPIError(response) {
  // const [toastAlert] = useToaster();

  console.log("Response", response);

  // Handle missing response or any unexpected error
  if (!response || !response.data) {
    // toastAlert("Something went wrong!", false);
    console.log("Something went wrong!", response);

    return;
  }

  // Show errors only when success is false
  if (response.data.success === false) {
    const errorMessages = Array.isArray(response.data.message)
      ? response.data.message
      : [response.data.message];

    // errorMessages.forEach((error) => {
    //   if (error) toastAlert(error, false);

    // });
  }
}
