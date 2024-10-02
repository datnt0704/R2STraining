export async function fetchJson(url: string) {
    try {
      const res = await fetch(url, {
        method: "GET",
      });
  
      if (!res.ok) {
        throw new Error(`Error: ${res.ok} ${res.statusText}`);
      }
  
      const jsonData = await res.json();
      return jsonData;
    } catch (error) {
      console.error("Failed to fetch data", error);
      throw error;
    }
  }
  
  export async function updateJson(
    url: string,
    body: any,
    method: "PUT" | "POST" | "PATCH"
  ) {
    try {
      const res = await fetch(url, {
        method: method || 'POST',
        body: JSON.stringify(body),
      });
  
      if (!res.ok) {
        throw new Error(`Error: ${res.ok} ${res.statusText}`);
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Failed to ${method} data`, error);
      throw error;
    }
  }
  
  export async function deleteJson(url: string, id: string) {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error(`Error: ${res.ok} ${res.statusText}`);
      }
  
      console.log("Resource deleted successfully");
      return { success: true };
    } catch (error) {
      console.error(`Failed to delete resource with id ${id}`, error);
      throw error;
    }
  }
  