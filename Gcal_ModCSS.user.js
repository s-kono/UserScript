// ==UserScript==
// @name           Gcal_ModCSS
// @description    Gcal ModCSS
// @author         github.com/s-kono
// @namespace      https://github.com/s-kono/UserScript
// @updateURL      https://github.com/s-kono/UserScript/raw/main/Gcal_ModCSS.user.js
// @downloadURL    https://github.com/s-kono/UserScript/raw/main/Gcal_ModCSS.user.js
// @version        0.20260505.0
// @match          https://calendar.google.com/calendar/u/0/*
// @exclude        https://calendar.google.com/calendar/u/0/r/week
// @grant          none
// @run-at         document-idle
// @icon           data:image/x-icon;base64,AAABAAEAMDAAAAEAGACoHAAAFgAAACgAAAAwAAAAYAAAAAEAGAAAAAAAAAAAAGAAAABgAAAAAAAAAAAAAAAAAAAMHwQoYg00fhE1gRE1gRE1gRE1gRE1gRE1gRE1gRFHmyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFBfGYKDS4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANHwQzfRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRFImyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFGgXouPNkKDS0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoYg01gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRFImyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFGgXoyQesuPNgKDS4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0fhE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRFImyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFGgXoyQesyQesuPNcKDS4AAAAAAAAAAAAAAAAAAAAAAAAAAAA1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRFImyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFGgXoyQesyQesyQesqN8YGBxoAAAAAAAAAAAAAAAAAAAAAAAA1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRFImyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFGgXoyQesyQesyQesyQesqN8YFBxkAAAAAAAAAAAAAAAAAAAA1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRFImyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFGgXoyQesyQesyQesyQesyQesqN8YFBxkAAAAAAAAAAAAAAAA1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRFImyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFGgXoyQesyQesyQesyQesyQesyQesqN8YGBxkAAAAAAAAAAAA1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRFImyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFGgXoyQesyQesyQesyQesyQesyQesyQesrOMoGCB0AAAAAAAA1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRFImyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFGgXoyQesyQesyQesyQesyQesyQesyQesyQesrOMoGCB0AAAA1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRE1gRFImyVSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFSqjFGgXoyQesyQesyQesyQesyQesyQesyQesyQesyQesrOMoGCByWhCmWhCmWhCmWhCmWhCmWhCmWhCmWhCmWhCmWhCmWhCmgtW6q1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1Zqq1ZpusLgYgPMYgPMYgPMYgPMYgPMYgPMYgPMYgPMYgPMYgPMRd9L0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r///////////////////////////////////////////////////////////////////////////////////////////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r///////////////////////////////////////////////////////////////////////////////////////////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r///////////////////////////////////////////////////////////////////////////////////////////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r///////////////////////////////////////////////////////////////////////////////////////////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r////////////////++vf2xp7vmlPsijjukkfzs3/87OD////////////////////////+/Pn0uov0uIf75tX///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r////////////87+TtjT/pdBPpdBPpdBPpdBPpdBPqeh740rP////////////////////++PTqeBvpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r//////////fzulEnpdBPpdhbxpGX1wpjysHnqeyDpdBPqeh387eD////////////////++PTqeBvpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r////////53MXpdBPpdBP1xJz////////////64czpdxjpdBP0uon////////////////++PTqeBvpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r///////////763sfzsnz//fz////////////////tj0LpdBPxpmn////////////////++PTqeBvpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r////////////////////////////////////++fXrgSnpdBPztYH////////////////++PTqeBvpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r//////////////////////////fz//Pn76drwnlvpdBPqeBv86dn////////////////++PTqeBvpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r////////////////////////sjDvqfCDpdhbpdBPrfSP407X////////////////////++PTqeBvpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r////////////////////////rhC/pdBPpdBPpdBPyrHP//Pv////////////////////++PTqeBvpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r////////////////////////76tv748/1vpPqeh7pdBPzsn3////////////////////++PTqeBvpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r////////////////////////////////////1wZbpdBPqeRz++fb////////0uYj648/++PTqeBvpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r//////////////fz51rr87+T////////////41rnpdBPpdRT87uL////51rvpdRXqeBv0u4vqeBrpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r//////////fzwoF7pdRXxq3H//v3//////v3yqnDpdBPqeBr++PT////64MvshTDpdBPpdBPpdBPpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r////////////zs3/pdBPpdBPtkUXyqW3tkELpdBPpdBPxqW7////////////99e7womLpdBTpdBPpdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r////////////++/nxqGzpdRTpdBPpdBPpdBPpdBTwnlv++PP//////////////////v72yKLqex/pdBP3zqz///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r//////////////////v763sfzt4XyrHL0t4b53cb//v3////////////////////////////87eD528H98un///////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r///////////////////////////////////////////////////////////////////////////////////////////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r///////////////////////////////////////////////////////////////////////////////////////////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r///////////////////////////////////////////////////////////////////////////////////////////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD707r///////////////////////////////////////////////////////////////////////////////////////////////+c5f0AvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfsAvfv0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD2u5b83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83sz83syuxcM5prw5prw5prw5prw5prw5prw5prw5prw5prw5prw5prz0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxL0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxL0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxL0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxL0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxL0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxL0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLvgz/0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLOZBK8ZzL0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxKdTQ4+IhDugz70hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLTZxLNZBExGAQAAABAIxHAajPvgz/0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkD0hkDnei7TZxLTZxLTZxLTZxLTZxLTZxLTZxLOZRKkUA40GQQAAACAAAAAA/8AAAAAAAAB/wAAAAAAAAD/AAAAAAAAAH8AAAAAAAAAPwAAAAAAAAAfAAAAAAAAAA8AAAAAAAAABwAAAAAAAAADAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAABAAA=
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
body, header, .tNDBE, .W0m3G::before, .W0m3G .r4nke, .Kk7lMc-DWWcKd-OomVLb-haAclf, .ULpymb, .J09ahd, .buGMKc, .OCQPo, .Gk2izd, .GENA3c, .iGiNKd {
    background-color: #000 !important;
}
.JtukPc, .J4VNSd {
    background-color: #111 !important;
}
.g3dbUc.smECzc.KKjvXb, .zC2ZSb {
    background-color: #444 !important;
}
.mr0WL, .MSZkRb .r4nke, .gb_na, .GXlaye .snByac, .uQ1ixe .snByac, .rSoRzd, .NI2kfb, .HLI7qf .c7fp5b, .Cd9hpd .snByac, .ULpymb .zHQkBf, .gb_na svg, .gb_Hc svg, .gb_3c .gb_5d, .gb_Sc .gb_5d, .wy3aMe, .yzYBvd, .rF3YF, div.rF3YF .NMm5M, div.rF3YF .Ce1Y1c, .SoBqBf, .OWyNBb, .W0m3G, .K2mXPb, .KSxb4d.pCcXPe, .pCoqfc, .MANBAf, .agOyMd .JAPzS, .agOyMd div.DN1TJ {
    color: #fff !important;
}
.IOneve .r4nke {
    background-color: dodgerblue;
}
.p6vobf .r4nke, .p6vobf.pWJCO .r4nke, .p6vobf.pWJCO.q2d9Ze .r4nke {
    background-color: rgb(221 26 232);
}
.RAaXne:not(.Wyo4Qe) {
    background-color: #111;
    div.wuX2hf {
        margin-bottom: 0;
    }
}
.wXaa9 {
    background-color: #222 !important;
}
.i8dSE .r4nke {
    color: #f0f !important;
}
.g3dbUc.UflSff {
    color: red !important;
}
.g3dbUc.qqMC3e {
    color: #000 !important;
}
.o5s4T .w48V4c {
    color: white;
}
.g3dbUc.smECzc, .g3dbUc.KCIIIb, .TgcD5e.CCDcoc .zHQkBf, .Kb2sf.CCDcoc .WpDZC, .QJLQUd, .ebs3Ne {
    color: #fff !important;
}
.EeuFAf {
    color: #53a6ff;
}
span.nHqeVd:has(span.DvyQhe.BdCDHc) {
    color: yellow !important;
}
span.nHqeVd:not(:has(span.DvyQhe.BdCDHc)) {
    color: black;
    font-weight: 600;
}
.xWId8e, .MDfQ7, .cAYGed.KKjvXb .Ioup7e, .cAYGed.KKjvXb .BMQm1d {
    background-color: #111 !important;
}
.NkK3Fc span, .gb_1c.gb_2c, .nxPHec, .O1gyfd, .MDfQ7, .shdZ7e .zHQkBf {
    color: #fff !important;
}
.VKy0Ic[aria-selected="true"] {
    background-color: #fff !important;
}
.VKy0Ic {
    background-color: #aaa !important;
}
.p9lUpf {
    background-color: #000 !important;
}
.gHQcAb, .wmCMbe {
    background-color: #111 !important;
}
.g3dbUc.smECzc:hover, .g3dbUc.KCIIIb:hover {
    background-color: red !important;
}
div.wuX2hf > div[role="columnheader"]:nth-of-type(7) > span {
    color: yellow;
    font-weight: 900;
}
div.wuX2hf > div[role="columnheader"]:nth-of-type(8) > span {
    color: red;
}
/* hover background-color */
div:has(> span.nHqeVd > span.DvyQhe.BdCDHc):hover {
    background-color: orange;
}
div:has(> span.nHqeVd > span.WBi6vc):hover {
    background-color: orange !important;
}

/* Today */
div[role="presentation"] > div[role="row"] > div > div:has(.w48V4c.F262Ye) {
    background-color: rgba(150,100,200,0.7);
    border-radius: 20px;
}

/* for Saturday (Starts on Monday) */
div.wuX2hf > div[role="columnheader"]:nth-of-type(7) {
    background-color: #004167;
}
div[role="presentation"] > div[role="row"] > div > div:nth-of-type(6) {
    background-color: #004167;
}
/* for Sunday (Starts on Monday) */
div.wuX2hf > div[role="columnheader"]:nth-of-type(8) {
    background-color: #830042;
}
div[role="presentation"] > div[role="row"] > div > div:nth-of-type(7) {
    background-color: #830042;
}
    `;
    document.head.appendChild(style);
})();

