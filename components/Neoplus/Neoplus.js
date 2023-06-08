import React from 'react'
import { useState } from 'react'
import ProductAll from "@/components/Neoplus/PriceAll";

export default function Neoplus(product) {
  // console.log(product.price);
  let p = [];
  p = product.product;

  //Pure Gold G01-UVC
  if (p == '6459f7c0ce49ec36bce51a95') {
    p = 'Pure Gold G01-UVC'
    return (
      <>
        {/* <h4>AP-1516D</h4> */}

        <h1 style={{ color: "#00BFFF", backgroundColor: "#f1dbdb" }}>เครื่องกรองน้ำ รุ่น {product.title}</h1>
        <h2 style={{ backgroundColor: "#d5f5d1" }} textAlign="center">รายละเอียดสินค้า</h2>
        <div>
          <p style={{ backgroundColor: "#f0f3eb" }}>ชำระเงินสด <span style={{ color: "red" }}>18,410 บาท
          </span> พร้อมบริการ 1 ปี</p>
        </div>

        <div style={{ width: "100% " }} Align="left">
          <h2 style={{ backgroundColor: "#ebf1b5" }} text-align="center">คุณสมบัติของสินค้า</h2>
          <div>
            <label style={{ backgroundColor: "#eaf1f3" , marginRight:"285px"}}>สี:</label>
            <label style={{ backgroundColor: "#e8eef0" }}>เทา</label>
          </div>

          <div>
            <label valign="top" style={{ backgroundColor: "#eaf1f3" , marginRight:"150px"}}>ระบบการกรอง และ<br />อายุการใช้งานไส้กรอง:</label>
            <label style={{ backgroundColor: "#eaf1f3" }}>Pre-filter (2-4 เดือน)
              <br /> <label style={{ backgroundColor: "#eaf1f3" , marginRight:"299px"}}> </label>Fine Dust Filter (4 เดือน)
              <br /> <label style={{ backgroundColor: "#eaf1f3" , marginRight:"299px"}}> </label>Pet filter (2-4 เดือน)
              <br /> <label style={{ backgroundColor: "#eaf1f3" , marginRight:"299px"}}> </label>Deodorization filter (24 เดือน)
              <br /> <label style={{ backgroundColor: "#eaf1f3" , marginRight:"299px"}}> </label>Double HEPA Filter (12 เดือน)
              <br />
              <p style={{ color: "#fe0000" }}>*หมายเหตุ CODY จะมาทำความสะอาดไส้กรองทุก 2 เดือน</p>
            </label>

          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }}>CADR</label>
            <label style={{ backgroundColor: "#eaf1f3" }}></label>
          </div>

          <div>
            <label style={{ paddingLeft: "40px", backgroundColor: "#eaf1f3" }}></label>ควันบุหรี่:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"200px"}}></label>264.5 ตร.ฟ.
          </div>

          <div>
            <label style={{ paddingLeft: "75px", backgroundColor: "#eaf1f3" }}></label>ฝุ่น:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"200px"}} ></label>302.4 ตร.ฟ.
          </div>

          <div>
            <label style={{ paddingLeft: "64px", backgroundColor: "#eaf1f3" }}></label>เกสร:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"200px"}}></label>342.7 ตร.ฟ.
          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }} valign="top"></label>แรงลม/Mode:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"208px"}}></label>
            7 Stages ( Auto / Silent / Level 1, 2 ,3 / Haze / Quick)
            
          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }}></label>อัตราการเสียง:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"205px"}}></label>19.98 - 48.3 dB (A)
          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }}></label>อัตราการใช้ไฟ:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"202px"}}></label>35 W.
          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }}></label>ขนาด: (กว้าง x ลึก x สูง)
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"140px"}}></label>41.0 x 24.0 x 76.5 ซม.
          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }}></label>น้ำหนักสุทธิ
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"223px"}}></label>12 kg.
          </div>
        </div>
      </>
    )
  }

  //Pure DM-02UVC
  else if (p == '6459f79fce49ec36bce51a8f') {
    p = 'Pure DM-02UVC'
    return (
      <>
        Pure DM-02UVC
      </>
    )
  }

  //Pure DM-02UVC
  else if (p == '6459f79fce49ec36bce51a8f') {
    p = 'Pure Gold G01-UVC'
    return (
      <>
        Pure Gold G01-UVC
      </>
    )
  }

  //Yomizu Lofto
  else if (p == '6459f6c8ce49ec36bce51a85') {
    p = 'Yomizu Lofto'
    return (
      <>
        Yomizu Lofto
      </>
    )
  }

  //Yomizu Kiyo-ii 6459f692ce49ec36bce51a7f 
  else if (p == '6459f692ce49ec36bce51a7f') {
    p = 'Yomizu Kiyo-ii'
    return (
      <>
        Yomizu Kiyo-ii
      </>
    )
  }

  //Amway eSpring 6459f0edce49ec36bce51a4d
  else if (p == '6459f0edce49ec36bce51a4d') {
    p = 'Amway eSpring'
    return (
      <>
        Amway eSpring
      </>
    )
  }

  //6459f692ce49ec36bce51a7f
  else if (p == '6459f692ce49ec36bce51a7f') {
    p = 'Yomizu Kiyo-ii'
    return (
      <>
        Yomizu Kiyo-ii
      </>
    )
  }

  //Coway Classic 6459e9d9ce49ec36bce51a41
  else if (p == '6459e9d9ce49ec36bce51a41') {
    p = 'Coway Classic'
    return (
      <>
        Coway Classic
      </>
    )
  }

  //Coway Platform 600 6459e7efce49ec36bce51a3b
  else if (p == '6459e7efce49ec36bce51a3b') {
    p = 'Coway Platform 600'
    return (
      <>
        Coway Platform 600
      </>
    )
  }

  //Coway Villaem 6459cb7cce49ec36bce519f1
  else if (p == '6459cb7cce49ec36bce519f1') {
    p = 'Coway Villaem'
    return (
      <>
        Coway Villaem
      </>
    )
  }

  //Coway Neo Plus 64572cc0c00f1970b94d1858
  else if (p == '64572cc0c00f1970b94d1858') {
    p = 'Coway Neo Plus'
    return (
      <>
        <h1 style={{ color: "#00BFFF", backgroundColor: "#f1dbdb" }}>เครื่องกรองน้ำ รุ่น {product.title}</h1>
        <h2 style={{ backgroundColor: "#d5f5d1" }} textAlign="center">รายละเอียดสินค้า</h2>
        <div>
          <p style={{ backgroundColor: "#f0f3eb" }}>ชำระเงินสด <span style={{ color: "red" }}>{product.price} บาท
          </span> พร้อมบริการ 1 ปี</p>
        </div>

        <div style={{ width: "100% " }} Align="left">
          <h2 style={{ backgroundColor: "#ebf1b5" }} text-align="center">คุณสมบัติของสินค้า</h2>
          <div>
            <label style={{ backgroundColor: "#eaf1f3" , marginRight:"285px"}}>สี:</label>
            <label style={{ backgroundColor: "#e8eef0" }}>เทา</label>
          </div>

          <div>
            <label valign="top" style={{ backgroundColor: "#eaf1f3" , marginRight:"150px"}}>ระบบการกรอง และ<br />อายุการใช้งานไส้กรอง:</label>
            <label style={{ backgroundColor: "#eaf1f3" }}>Pre-filter (2-4 เดือน)
              <br /> <label style={{ backgroundColor: "#eaf1f3" , marginRight:"299px"}}> </label>Fine Dust Filter (4 เดือน)
              <br /> <label style={{ backgroundColor: "#eaf1f3" , marginRight:"299px"}}> </label>Pet filter (2-4 เดือน)
              <br /> <label style={{ backgroundColor: "#eaf1f3" , marginRight:"299px"}}> </label>Deodorization filter (24 เดือน)
              <br /> <label style={{ backgroundColor: "#eaf1f3" , marginRight:"299px"}}> </label>Double HEPA Filter (12 เดือน)
              <br />
              <p style={{ color: "#fe0000" }}>*หมายเหตุ CODY จะมาทำความสะอาดไส้กรองทุก 2 เดือน</p>
            </label>

          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }}>CADR</label>
            <label style={{ backgroundColor: "#eaf1f3" }}></label>
          </div>

          <div>
            <label style={{ paddingLeft: "40px", backgroundColor: "#eaf1f3" }}></label>ควันบุหรี่:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"200px"}}></label>264.5 ตร.ฟ.
          </div>

          <div>
            <label style={{ paddingLeft: "75px", backgroundColor: "#eaf1f3" }}></label>ฝุ่น:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"200px"}} ></label>302.4 ตร.ฟ.
          </div>

          <div>
            <label style={{ paddingLeft: "64px", backgroundColor: "#eaf1f3" }}></label>เกสร:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"200px"}}></label>342.7 ตร.ฟ.
          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }} valign="top"></label>แรงลม/Mode:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"208px"}}></label>
            7 Stages ( Auto / Silent / Level 1, 2 ,3 / Haze / Quick)
            
          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }}></label>อัตราการเสียง:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"205px"}}></label>19.98 - 48.3 dB (A)
          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }}></label>อัตราการใช้ไฟ:
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"202px"}}></label>35 W.
          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }}></label>ขนาด: (กว้าง x ลึก x สูง)
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"140px"}}></label>41.0 x 24.0 x 76.5 ซม.
          </div>

          <div>
            <label style={{ backgroundColor: "#eaf1f3" }}></label>น้ำหนักสุทธิ
            <label style={{ backgroundColor: "#eaf1f3" ,marginRight:"223px"}}></label>12 kg.
          </div>
        </div>
      </>
    )
  }

  //Philips ADD6915 64488e0b8caa9095ce96d059
  else if (p == '64488e0b8caa9095ce96d059') {
    p = 'Philips ADD6915'
    return (
      <>
        Philips ADD6915
      </>
    )
  }

  else {
    console.log('other')
  }
}


