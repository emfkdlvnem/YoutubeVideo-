/** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react';
import styled from '@emotion/styled';
import '@fortawesome/fontawesome-free/css/all.min.css';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
    const totalSlides = 3;
    const slideDuration = 3000;
    //slide
    const [activeSlide, setActiveSlide] = useState(0);
    //scroll
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

    
    useEffect(() => {
        const autoSlideTimer = setInterval(() => {
            goToSlide((activeSlide + 1) % totalSlides);
        }, slideDuration);
    
        return () => clearInterval(autoSlideTimer);
    }, [activeSlide]);
    
    const goToSlide = (index: number) => {
        setActiveSlide(index);
    };

    const prevSlide = () => {
        goToSlide((activeSlide - 1 + totalSlides) % totalSlides);
    };
    const nextSlide = () => {
        goToSlide((activeSlide + 1) % totalSlides);
    };
    const handleIndicatorClick = (index: number) => {
        goToSlide(index);
    };
    
      // ScrollToTopButton
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) { 
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // ScrollTopButton을 클릭하면 페이지 맨 위로 스크롤되도록 하는 함수
    const handleScrollTopButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Container className="container">
                <Carousel className="carousel">
                    <SlideArea className="slide-area">
                        <Slide className={`slide ${activeSlide === 0 ? 'active' : ''}`}>
                            <SlideContent>
                                <h2 className="title">Slide {(activeSlide + 1) % totalSlides + 1} Title</h2>
                                <p className="txt">This is Slide {(activeSlide + 1) % totalSlides + 1}<br />Different content goes here.</p>
                                <Link to={`/slide${(activeSlide + 1) % totalSlides + 1}`} className="btn btn-more"><span>More</span></Link>
                            </SlideContent>
                        </Slide>
                        <Slide className={`slide ${activeSlide === 1 ? 'active' : ''}`}>
                            <SlideContent>
                                <h2 className="title">Slide {(activeSlide + 2) % totalSlides + 1} Title</h2>
                                <p className="txt">This is Slide {(activeSlide + 2) % totalSlides + 1}<br />More content for the third slide.</p>
                                <Link to={`/slide${(activeSlide + 2) % totalSlides + 1}`} className="btn btn-more"><span>More</span></Link>
                            </SlideContent>
                        </Slide>
                        <Slide className={`slide ${activeSlide === 2 ? 'active' : ''}`}>
                            <SlideContent>
                                <h2 className="title">Lorem ipsum dolor sit amet.</h2>
                                <p className="txt">This is Slide {activeSlide + 1}<br />Some content here.</p>
                                <Link to={`/slide${activeSlide + 1}`} className="btn btn-more"><span>More</span></Link>
                            </SlideContent>
                        </Slide>
                    </SlideArea>
                    <IndicatorArea className="indicator-area">
                        {Array.from({ length: totalSlides }, (_, index) => (
                                <span
                                    key={index}
                                    className={`indicator ${activeSlide === index ? 'active' : ''}`}
                                    onClick={() => handleIndicatorClick(index)} // 클릭 이벤트 추가
                                ></span>
                        ))}
                    </IndicatorArea>
                    <BtnCarousel className="btn-area">
                        <button type="button" className="btn prev" onClick={prevSlide}>
                            <i className="fa-solid fa-chevron-left"></i>
                            <span className="blind">이전</span>
                        </button>
                        <button type="button" className="btn next" onClick={nextSlide}>
                            <i className="fa-solid fa-chevron-right"></i>
                            <span className="blind">다음</span>
                        </button>
                    </BtnCarousel>
                </Carousel>

                {showScrollTopButton && (
                    <ScrollTopButton
                        id="scroll-top-btn"
                        className="btn scroll"
                        title="위로 올라가기"
                        onClick={handleScrollTopButtonClick} 
                    >
                        <span className="blind">위로 올라가기</span>
                        <i className="fa-solid fa-circle-up"></i>
                    </ScrollTopButton>
                )}
            </Container>
        </>
    );
};


const Container = styled.div`
    position: relative;
    margin-top: 110px;
`;
const Carousel = styled.div`
    position: relative;
    overflow: hidden;
`;
const SlideArea = styled.div`
    display: flex;
    height: 500px;
`;
const Slide = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #efefef; 
    z-index: 1;
    transition: opacity 0.5s ease-in-out;
    
    &.active {
        opacity: 1;
    }
    
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(34,34,34,0.4);
    }
`;
const SlideContent = styled.div`
    position: absolute;
    top: 50%;
    left: 120px;
    transform: translateY(-50%);
    color: #fff;

    .title {
        font-size: 18px;
        margin-bottom: 5px;
    }
    .txt {
        font-size: 32px;
        font-weight: 700;
        line-height: 1.2;
    }
    .btn-more {
        display: inline-block;
        padding: 8px 20px;
        margin-top: 20px;
        color: #000;
        font-size: 18px;
        font-weight: 700;
        border-radius: 7px;
        background-color: #fff;
    }
    .btn-more:hover {
        color: #fff;
        background-color: #7F5539;
        transition: all 0.3s;
    }
`;

const IndicatorArea = styled.div`
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    z-index: 1;

    .indicator {
        width: 10px;
        height: 10px;
        margin: 0 5px;
        border-radius: 50%;
        cursor: pointer;
        background-color: #C4C4C4;
    }
    .indicator:hover {
        transition: all 0.3s;
        background-color: #fff;
    }
    
    .indicator.active {
        background-color: #1877F2;
    }
`;
const BtnCarousel = styled.div `
    .btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
        font-size: 40px;
        padding: 0 20px;
        opacity: 0.7;
        border: none;
        background: none;
        z-index: 1;
    }
    .btn.prev {
        left: 0;
    }
    .btn.next {
        right: 0;
    }
    .btn:hover {
        color: #7F5539;
        opacity: 1;
        transition: all 0.3s;
    }
`;

const ScrollTopButton = styled.button`
    position: fixed;
    right: 20px;
    bottom: 50px;
    width: 35px;
    height: 35px;
    font-size: 35px;
    // border: none;
    border-radius: 50%;
    transition: opacity 0.3s, visibility 0.3s;
    background: none;
    z-index: 101;
    cursor: pointer;
    color: #7F5539;
    i {
        position: fixed;
        right: 20px;
        bottom: 50px;
    }

`;
export default MainPage;