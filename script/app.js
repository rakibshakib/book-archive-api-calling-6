const inputBookField = document.getElementById('input-book');
const searchFound = document.getElementById('total-item');
const displayBook = document.getElementById('display-book');
const loading = document.getElementById('loading');
const numFound = document.getElementById('total-num');


const getBooks = async () => {
    loading.innerText = "Data Loading.......";
    const bookName = inputBookField.value;
    const url = `http://openlibrary.org/search.json?q=${bookName}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        updateBookData(data);
    } catch (error) {
        console.log(error);
    }
};

const updateBookData = data => {
    displayBook.innerHTML = '';
    searchFound.innerText = data.docs.length;
    numFound.innerText = data.numFound;
    data.docs.slice(0, 10).forEach(book => {
        showData(book);
    })
}
const showData = book => {
    const li = document.createElement('li');
    li.classList.add("flex", "justify-start", "items-center", "border-2", "py-2", "px-5", "my-2", "bg-blue-200");
    li.innerHTML = `
        <figure>
            <img class="w-40" src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" alt="image not found">
        </figure>
        <div class="ml-8">
            <h2 class="text-3xl">${book.title}</h2>
            <p class="text-xl">Author Name: ${book.author_name}</p>
            <p>Publish Date: ${book.first_publish_year}</p>
        </div>
        `
    displayBook.appendChild(li);
}