import { jsx } from '@keystone-ui/core';
import React from 'react';

function CustomLogo() {
  return (
    <h3
      style={{
        padding: '10px',
        borderRadius: '5px',
        color: '#3b82f6',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      Hệ thống Quản lý Đăng ký Môn học và Học phí
    </h3>
  );
}

export const components = {
  Logo: CustomLogo,
};