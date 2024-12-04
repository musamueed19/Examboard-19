"use server";
// api.js
export async function loginUser(formData) {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`;

  // console.log(url, formData);

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
    } else if (response.status >= 400 && response.status < 500) {
      return { success: false, error: data?.message, data };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Internal server issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error.message || String(error) };
  }
}

export async function verifyUser(code, id) {
  console.log(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/verifyCode/${code}/${id}`
  );
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/verifyCode/${code}/${id}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("---------------------------", response.status, response);
    // Handle response based on status code0
    const data = await response.json();
    console.log("----------Verify", data);
    if (response.status === 201) {
      return { success: true, data: data.message }; // return data on success
    } else if (response.status === 400 || response.status === 403) {
      return { success: false, error: data.message, data };
    } else if (response.status === 404) {
      return { success: false, error: "user does not exist", data };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Internal server issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error }; // handle network or other errors
  }
}

export async function setPassword(id, password) {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/setPassword/${id}`;
  console.log(url, password);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password: password}),
    });

    // Handle response based on status code
    const data = await response.json();
    if (response.status === 201) {
      return { success: true, data: data.message }; // return data on success
    } else if (response.status > 399 && response.status < 500) {
      return { success: false, error: data.message };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Internal server issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function forgotPassword(emailId) {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/forgotPassword/${emailId}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("---------------------------", response.status, response);
    const data = await response.json();
    console.log("---------------------------", data);


    if (response.status === 201) {
      return { success: true, data: data.message }; // return data on success
    } else if (response.status === 400 || response.status === 404) {
      return { success: false, error: data.message };
    } else if (response.status === 500) {
      return { success: false, error: data.message };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }

  } catch (error) {
    return { success: false, error: error };
  }
}

export async function resetVerify(code, id) {
  console.log(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/resetCode/${code}/${id}`
  );
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/resetCode/${code}/${id}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("---------------------------", response.status, response);
    // Handle response based on status code0
    const data = await response.json();
    console.log("----------Verify", data);
    if (response.status === 201) {
      return { success: true, data: data.message }; // return data on success
    } else if (response.status === 400) {
      return { success: false, error: data.message, data };
    } else if (response.status === 404) {
      return { success: false, error: "user does not exist", data };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Internal server issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error }; // handle network or other errors
  }
}

export async function resetPassword(id, password) {
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/resetPassword/${id}`;
  console.log(url, password);

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword: password }),
    });

    // Handle response based on status code
    const data = await response.json();
    if (response.status === 200) {
      return { success: true, data: data.message }; // return data on success
    } else if (response.status === 404) {
      return { success: false, error: data.message };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Internal server issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error };
  }
}

export async function changePassword(id, currentPassword, password) {
  
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/changePassword/${id}`;
    console.log("Change Password ------", url, id, currentPassword, password);

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: currentPassword,
        newPassword: password,
      }),
    });

    // Handle response based on status code
    const data = await response.json();
    if (response.status === 200) {
      return { success: true, data: data.message }; // return data on success
    } else if (response.status === 404 || response.status === 400) {
      return { success: false, error: data.message };
    } else if (response.status === 500) {
      return { success: false, error: "Sorry, Internal server issue" };
    } else {
      return { success: false, error: `Unexpected error: ${response.status}` };
    }
  } catch (error) {
    return { success: false, error: error };
  }
}