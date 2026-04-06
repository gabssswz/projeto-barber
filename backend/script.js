gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.ticker.lagSmoothing(0);

gsap.to(".cards", {
    scrollTrigger: {
        trigger: "#planos",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
    },
    gap: "70px",
    ease: "power2.out"
});

gsap.to(".card", {
    scrollTrigger: {
        trigger: "#planos",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        invalidateOnRefresh: true,
        refreshPriority: 1,
    },
    scale: 1.1,
    ease: "power2.out",
    immediateRender: false
});

window.addEventListener('load', () => {
    ScrollTrigger.refresh()
})


async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const map = new Map(document.getElementById('map'), {
        zoom: 18,
        center: { lat: -21.37437180145707, lng: -45.51088139840124 },
        mapId: "bc7e43f77a454f97260f1e2c"
    });

    const marker = new AdvancedMarkerElement({
        position: { lat: -21.37437180145707, lng: -45.51088139840124 },
        map: map,
        title: "Elite Barbearia"
    });

    const infoWindow = new InfoWindow({
        content: '<h1 style="color: orange">Elite Barbearia</h1>'
    });

    marker.addListener('gmp-click', () => {
        infoWindow.open(map, marker);
    });
}

initMap();