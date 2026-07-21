// 1. Select the h1 element
const mainHeading = document.querySelector("h1");

// 2. Select all elements with class "content"
const contentElements = document.getElementsByClassName("content");
// or: const contentElements = document.querySelectorAll(".content");

// 3. Select the form with id "contact-form"
const contactForm = document.getElementById("contact-form");

// 4. Select the email input
const emailInput = document.getElementById("email");
// or: const emailInput = document.querySelector('input[type="email"]');

// 5. Select all list items in the nav
const navItems = document.querySelectorAll("nav ul li");

// 6. Select the first .nav-link
const firstNavLink = document.querySelector(".nav-link");

// 7. Select the last paragraph
const allParagraphs = document.querySelectorAll("p");
const lastParagraph = allParagraphs[allParagraphs.length - 1];
// or: const lastParagraph = document.querySelector("p:last-of-type");
// 1. Select the header, then navigate to the nav inside it
const header = document.querySelector("#main-header");
const nav = header.querySelector("nav");
// or: const nav = header.firstElementChild; // or header.children[1] depending on HTML structure

// 2. Select the first nav-link, then get its parent li
const firstLink = document.querySelector(".nav-link");
const parentLi = firstLink.parentElement;

// 3. Select the article, then get its next sibling (section)
const article = document.querySelector("article");
const section = article.nextElementSibling;

// 4. Select the ul, then get all its child li elements
const ul = document.querySelector(".nav-list");
const childLis = ul.children;

// 5. Start from the footer and navigate up to the body
const footer = document.querySelector("footer");
const body = footer.parentElement;
function addNavItem(text, href) {
  const ul = document.querySelector(".nav-list");
  
  // Create list item and anchor tag
  const li = document.createElement("li");
  const a = document.createElement("a");
  
  a.textContent = text;
  a.setAttribute("href", href);
  a.className = "nav-link";
  
  li.appendChild(a);
  ul.appendChild(li);
}

// Example usage:
addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");
