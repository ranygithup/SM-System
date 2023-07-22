<div id="_main_dashboardComponent" style="display:none">
    <div class="row row-cols-lg-4 gy-2">
        <div class="col">
            <div class="d-flex p-3 bg-white rounded-3">
                <div class="d-flex align-items-center flex-column w-50">
                    <img class="db_icons_" src="{{ asset('icons/students.png') }}" alt=""/>
                    <p class="pb-0 m-0 mt-2 fw-bold">Students</p>
                </div>
                <div class="vr mx-3"></div>
                <div class="d-flex align-items-center justify-content-center w-50">
                    <p class="fs-3 pb-0 m-0">50000</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="d-flex p-3 bg-white rounded-3">
                <div class="d-flex align-items-center flex-column w-50">
                    <img class="db_icons_" src="{{ asset('icons/teacher.png') }}" alt=""/>
                    <p class="pb-0 m-0 mt-2 fw-bold">Teachers</p>
                </div>
                <div class="vr mx-3"></div>
                <div class="d-flex align-items-center justify-content-center w-50">
                    <p class="fs-3 pb-0 m-0">10000</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="d-flex p-3 bg-white rounded-3">
                <div class="d-flex align-items-center flex-column w-50">
                    <img class="db_icons_" src="{{ asset('icons/parent.png') }}" alt=""/>
                    <p class="pb-0 m-0 mt-2 fw-bold">Parents</p>
                </div>
                <div class="vr mx-3"></div>
                <div class="d-flex align-items-center justify-content-center w-50">
                    <p class="fs-3 pb-0 m-0">15000</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="d-flex p-3 bg-white rounded-3">
                <div class="d-flex align-items-center flex-column w-50">
                    <img class="db_icons_" src="{{ asset('icons/total_earning.png') }}" alt=""/>
                    <p class="pb-0 m-0 mt-2 fw-bold">Total Earnings</p>
                </div>
                <div class="vr mx-3"></div>
                <div class="d-flex align-items-center justify-content-center w-50">
                    <p class="fs-3 pb-0 m-0">30000</p>
                </div>
            </div>
        </div>
    </div>
    <div class="row row-cols-lg-2 gy-2 mt-3">
        <div class="col">
            <div class="chart-container p-3 bg-white h-100 rounded-3 position-relative">
                <canvas id="_db_chart" class="w-100 h-100"></canvas>
            </div>
        </div>
        <div class="col">
            <div class="row row-cols-lg-2 gy-2">
                <div class="col">
                    <div class="p-3 bg-white rounded-3">
                        <div class="w-100">
                            <img class="db_icons_" src="{{ asset('icons/facebook.png') }}" alt=""/>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <div class="w-50">
                                <p class="fw-bold my-0">Like us</p>
                                <p class="fw-bold my-0">on Facebook</p>
                            </div>
                            <div class="vr"></div>
                            <div class="w-50 text-center">
                                <h4 class="fw-bold my-0 ms-2">30000</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="p-3 bg-white rounded-3">
                        <div class="w-100">
                            <img class="db_icons_" src="{{ asset('icons/telegram.png') }}" alt=""/>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <div class="w-50">
                                <p class="fw-bold my-0">Like us</p>
                                <p class="fw-bold my-0">on Telegram</p>
                            </div>
                            <div class="vr"></div>
                            <div class="w-50 text-center">
                                <h4 class="fw-bold my-0 ms-2">13000</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="p-3 bg-white rounded-3">
                        <div class="w-100">
                            <img class="db_icons_" src="{{ asset('icons/tiktok.png') }}" alt=""/>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <div class="w-50">
                                <p class="fw-bold my-0">Like us</p>
                                <p class="fw-bold my-0">on Tik Tok</p>
                            </div>
                            <div class="vr"></div>
                            <div class="w-50 text-center">
                                <h4 class="fw-bold my-0 ms-2">9000</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="p-3 bg-white rounded-3">
                        <div class="w-100">
                            <img class="db_icons_" src="{{ asset('icons/instagram.png') }}" alt=""/>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <div class="w-50">
                                <p class="fw-bold my-0">Like us</p>
                                <p class="fw-bold my-0">on Instagram</p>
                            </div>
                            <div class="vr"></div>
                            <div class="w-50 text-center">
                                <h4 class="fw-bold my-0 ms-2">3000</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row gy-2 mt-3">
        <div class="col-lg-6">
            <div class="p-3 bg-white rounded-3">
                <div id="_db_calendar"></div>
            </div>
        </div>
        <div class="col-xl-3">
            <div class="p-3 bg-white rounded-3"></div>
        </div>
        <div class="col-xl-3">
            <div class="p-3 bg-white rounded-3"></div>
        </div>
    </div>
</div>