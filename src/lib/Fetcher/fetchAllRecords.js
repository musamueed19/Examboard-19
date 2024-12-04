'use server'
// api.js
export async function getAll(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle response based on status code
    const data = await response.json();
    console.log(`------------------`, data);
    if (response.status === 200) {
      return { success: true, data }; // return data on success
    } else if (response.status === 401) {
      return { success: false, error: "Could not find data", data };
    } else if (response.status === 404) {
      return { success: false, error: "Could not load data", data };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Internal server issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error }; // handle network or other errors
  }
}
