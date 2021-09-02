const inputBookField = document.getElementById('input-book');
const displayBook = document.getElementById('display-book');
const loading = document.getElementById('loading');
const resultFound = document.getElementById('total-num');
const errorMsg = document.getElementById('errorMsg');
const notFound = document.getElementById('notFound-Item');
const query = document.getElementById("query");


const getBooks = async () => {
    loading.innerText = "Data Loading.......";
    displayBook.innerHTML = '';
    const bookName = inputBookField.value;
    const url = `http://openlibrary.org/search.json?q=${bookName}`
    if (inputBookField.value === '') {
        errorMsg.style.display = 'block';
        loading.innerText = '';
        notFound.style.display = 'none';
    }
    else {
        errorMsg.style.display = 'none';
        notFound.style.display = 'none';
        try {
            const res = await fetch(url);
            const data = await res.json();
            updateBookData(data);
        } catch (error) {
            console.log(error);
            loading.innerText = "503 Error!! Data Not Found.";
        }
    }
    inputBookField.value = '';
};

const updateBookData = data => {
    resultFound.innerText = data.numFound;
    query.innerText = data.q;
    if (data.numFound === 0) {
        loading.innerText = '';
        notFound.style.display = 'block';
    } else {
        data.docs.slice(0, 10).forEach(book => {
            showData(book);
        })
    }

}
const showData = book => {
    loading.innerText = '';
    const li = document.createElement('li');
    https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg 
    book?.cover_i? img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : img = `../images/notfound.png`;
    
    li.classList.add("flex", "justify-start", "items-center", "border-2", "py-2", "px-5", "my-2", "bg-green-100");
    li.innerHTML = `
        <figure>
            <img class="w-40" src="${img}" alt="">
        </figure>
        <div class="ml-8">
            <h2 class="text-4xl my-3">${book.title}</h2>
            <p class="text-2xl mb-3">Author Name: ${book.author_name}</p>
            <p>Publish Date In: ${book.first_publish_year}</p>
        </div>
        `
    displayBook.appendChild(li);
}