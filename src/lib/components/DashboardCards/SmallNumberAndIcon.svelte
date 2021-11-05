<script>
    export let title = "Total Users";
    export let number = "2,300";
    export let icon = "file-check";
    export let color = "#8280FF"


    let iconBackground = shadeColor(color, 50);


    // https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors#answer-13532993
    function shadeColor(color, percent) {
        let R = parseInt(color.substring(1,3),16);
        let G = parseInt(color.substring(3,5),16);
        let B = parseInt(color.substring(5,7),16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R<255)?R:255;
        G = (G<255)?G:255;
        B = (B<255)?B:255;

        let RR = ((R.toString(16).length===1) ? "0" + R.toString(16) : R.toString(16));
        let GG = ((G.toString(16).length===1) ? "0" + G.toString(16) : G.toString(16));
        let BB = ((B.toString(16).length===1) ? "0" + B.toString(16) : B.toString(16));

        return "#"+RR+GG+BB;
    }
</script>


<style>
    h2 {
        opacity: 0.5;
        font-size: 18px;
        font-weight: 700;
    }

    .dashboard-number {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 0;
    }

    .icon {
        width: 72px;
        height: 72px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
    }

    .icon i {}
</style>


<div class="col">
    <h2>{title}</h2>
    <p class="dashboard-number">{number}</p>
</div>

<div class="col-auto icon" style="background-color: {iconBackground}">
    <i class="bi bi-{icon}" style="color:{color}"></i>
</div><!-- end icon -->