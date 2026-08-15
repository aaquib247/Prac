// async function getAllUsers(limit) {
//     let skip = 0;
//     let allUsers = [];

//     let totalPages = 1;
//     let currentPage = 1;

//     while (currentPage <= totalPages) {

//         const url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

//         const res = await fetch(url);
//         const result = await res.json();

//         allUsers.push(...result.users);

//         totalPages = Math.ceil(result.total / limit);

//         skip += limit;
//         currentPage++;
//     }

//     return allUsers;
// }

// const users = await getAllUsers(10);

// console.log(users);
//////////////////////////

// async function deleteUser(id) {
//     const url = `https://dummyjson.com/users/${id}`;

//     const response = await fetch(url, {
//         method: "DELETE"
//     });

//     const result = await response.json();

//     console.log(result);
// }

// deleteUser(1);



// const url = "https://jsonplaceholder.typicode.com/users";
// let res = [];

// const users = await get(url);



// for(let user of users) {
//     res.push([user.id, user.name, user.email, user.address]);
// }

// console.log(JSON.stringify(res,null, 2));


// async function get(url) {
//     const res = await fetch(url);
//     return await res.json();
// }



const url = "https://dummyjson.com/posts/add";

const token = "my_dummy_token";

const postData = {
    title: "Learning API",
    body: "Practicing POST request",
    userId: 1
};

async function createPost() {

    const response = await fetch(url, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(postData)
    });

    const result = await response.json();

    console.log(result);
}

createPost();
