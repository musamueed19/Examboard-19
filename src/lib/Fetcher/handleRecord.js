'use server'

export async function postRecord(url, formData) {
  console.log(url, formData);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.status === 201) {
      return { success: true, data };
    } else if (response.status === 400 || response.status === 401) {
      return { success: false, error: data.message, data };
    } else if (response.status === 404) {
      return { success: false, error: data.message, data };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Internal server issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}


export async function patchRecord(url, formData) {
  console.log(url, formData);

  // console.log("---" + url, JSON.stringify(formData) + '---');

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.status === 200) {
      return { success: true, data };
    } else if (response.status === 400) {
      return { success: false, error: data.message, data };
    } else if (response.status === 401) {
      return { success: false, error: data.message, data };
    } else if (response.status === 404) {
      return { success: false, error: data.message, data };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Internal server issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}


export async function deleteRecord(url) {
  console.log(url);

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      return { success: true };
    } else if (response.status === 401) {
      return { success: false, error: data.message, data };
    } else if (response.status === 404) {
      return { success: false, error: data.message, data };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Internal server issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}