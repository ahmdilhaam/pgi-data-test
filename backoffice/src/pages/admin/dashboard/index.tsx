import React, { useState } from "react";
import { Card, PanelContent } from "@/components";
import Cookies from "js-cookie";
import { useEffect } from 'react';
import Link from "next/link";
import Axios from 'axios';

export default function Dashboard() {
  const [name, setName] = useState(false);
  const [userRegistCount, setUserRegistCount] = useState(0);
  const token = Cookies.get("user");
  
  useEffect(() => {
    const parseToken = JSON.parse(token ?? "")
    setName(parseToken.name)

    Axios.get(`${process.env.API_URL!}/v1/user-count`, {
      headers: {
        Authorization: `Bearer ${parseToken.token}`
      }
    }).then(response => {
      const { result } = response.data
      setUserRegistCount(result)
    })
  }, []);

  return (
    <PanelContent headerContent title={`Welcome, ${name}`}>
      <div className="row">
        <div className="col-lg-3 col-6">
          <div className="small-box text-bg-primary">
            <div className="inner">
              <h3>0</h3>
              <p>Dummy</p>
            </div>
            <div className="small-box-icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <Link
              href="/"
              className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
            >
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box text-bg-success">
            <div className="inner">
              <h3>
                0<sup style={{ fontSize: "20px" }}>%</sup>
              </h3>
              <p>Dummy</p>
            </div>
            <div className="small-box-icon">
              <i className="fa-solid fa-signal"></i>
            </div>
            <Link
              href="/"
              className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
            >
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box text-bg-warning">
            <div className="inner">
              <h3>{userRegistCount}</h3>
              <p>User Registrations</p>
            </div>
            <div className="small-box-icon">
              <i className="fa-solid fa-user"></i>
            </div>
            <Link
              href="/"
              className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
            >
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>

        <div className="col-lg-3 col-6">
          <div className="small-box text-bg-danger">
            <div className="inner">
              <h3>0</h3>
              <p>Dummy</p>
            </div>
            <div className="small-box-icon">
              <i className="fa-solid fa-chart-pie"></i>
            </div>
            <Link
              href="/"
              className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
            >
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
      </div>
    </PanelContent>
  );
}
