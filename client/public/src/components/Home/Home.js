import React from 'react';
import './style.css';
import Contact from '../ContactUs/Contact';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#f2f2f2' }}>
      <div
        id="carouselExampleInterval"
        class="carousel slide p-3"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="10000">
            <img
              src="https://caresoft.co.in/wp-content/uploads/2016/11/Hospital-Management-software-Benefit.png"
              class="d-block w-100"
              alt="first slide"
              style={{ height: '90vh' }}
            />
          </div>
          <div class="carousel-item" data-bs-interval="2000">
            <img
              src="https://appvales.com/wp-content/uploads/image.jpeg"
              class="d-block w-100"
              alt="slide two"
              style={{ height: '90vh' }}
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://www.appletechsoft.com/wp-content/uploads/2020/06/Hospital-Management-System.jpg"
              class="d-block w-100"
              alt="third slide"
              style={{ height: '90vh' }}
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div className="services m-3">
        <h2 className="services-heading">Our Services</h2>
        <div className="services-grid">
          <div className="service-item">
            <img
              src="https://media.smallbiztrends.com/2017/05/shutterstock_460089175.jpg"
              alt="Appointment"
              className="service-image"
              style={{ height: '200px' }}
            />
            <h3 className="service-title">Appointment Scheduling</h3>
            <p className="service-description">
              We offer reliable and efficient transportation services for all
              types of cargo, including heavy haul and oversize loads.
            </p>
          </div>
          <div className="service-item">
            <img
              src="https://apexcovantage.com/wp-content/uploads/2022/03/servciechart.png"
              alt="Logistics"
              className="service-image"
              style={{ height: '200px' }}
            />
            <h3 className="service-title">Medical Records Management</h3>
            <p className="service-description">
              Our logistics services include freight management, supply chain
              optimization, and inventory management.
            </p>
          </div>
          <div className="service-item">
            <img
              src="https://www.basunivesh.com/wp-content/uploads/2014/01/Banking-Rules.jpg"
              alt="Storage"
              className="service-image"
              style={{ height: '200px' }}
            />
            <h3 className="service-title">
              Complaints and Regulatory Tracking
            </h3>
            <p className="service-description">
              We offer secure and affordable storage solutions for all types of
              cargo, including hazardous materials and refrigerated goods.
            </p>
          </div>
        </div>
      </div>
      <div className="m-3">
        {/* <h2 className="services-heading">Testimonials</h2> */}
        <div class="testimonial-row">
          <div class="testimonial-container">
            <div class="testimonial">
              <p class="testimonial-text">
                "As the CEO of our esteemed healthcare organization, I am
                delighted to share my testimonial for the exceptional hospital
                management system we have implemented. This advanced solution
                has revolutionized our operations, enabling us to seamlessly
                manage and optimize every aspect of our hospital."
              </p>
              <p class="testimonial-author">- Kevin Babu Varkey, CEO</p>
            </div>
          </div>
          <div class="testimonial-container">
            <div class="testimonial">
              <p class="testimonial-text">
                "As the Chief Medical Officer of our esteemed healthcare
                organization, I am pleased to provide my testimonial for the
                remarkable hospital management system we have implemented. This
                cutting-edge solution has greatly transformed our hospital's
                efficiency and effectiveness in delivering exceptional patient
                care."
              </p>
              <p class="testimonial-author">
                - Asvin L Vinod, Chief Medical Officer
              </p>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default Home;
