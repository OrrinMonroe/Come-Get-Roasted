toggleFilters();

function toggleFilters() {
    const filterToggle = document.querySelector('.toggleFiltersMobile');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const hamburger = document.querySelector('.ham-menu');

    const mobileFilterList = document.querySelector('.mobileFilterList');

    if (mobileFilterList != null) {
        filterToggle.addEventListener('click', () =>{
            mobileFilterList.classList.toggle('active');
            offScreenMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        })
    }

}