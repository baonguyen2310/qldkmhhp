import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  float,
  checkbox,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
import type { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data?.role === 'admin',
        update: ({ session }) => session?.data?.role === 'admin',
        delete: ({ session }) => session?.data?.role === 'admin',
      },
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      password: password({ validation: { isRequired: true } }),
      role: select({
        type: 'enum',
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Academic Staff', value: 'academic_staff' },
          { label: 'Finance Staff', value: 'finance_staff' },
          { label: 'Student', value: 'student' },
        ],
      }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Class: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      class_name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      major: relationship({
        ref: 'Major',
        ui: { displayMode: 'select', labelField: 'major_name' },
        many: false,
      }),
      academic_year: text({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['class_name', 'major', 'academic_year'],
      },
    },
  }),

  Major: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      major_name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      description: text(),
    },
    ui: {
      listView: {
        initialColumns: ['major_name', 'description'],
      },
    },
  }),

  Semester: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      semester_name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      start_date: timestamp({ validation: { isRequired: true } }),
      end_date: timestamp({ validation: { isRequired: true } }),
      registration_start: timestamp({ validation: { isRequired: true } }),
      registration_end: timestamp({ validation: { isRequired: true } }),
      payment_deadline: timestamp({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['semester_name', 'start_date', 'end_date', 'registration_end', 'payment_deadline'],
      },
    },
  }),

  Student: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      student_code: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      first_name: text({ validation: { isRequired: true } }),
      last_name: text({ validation: { isRequired: true } }),
      date_of_birth: timestamp({ validation: { isRequired: true } }),
      gender: select({
        options: [
          { label: 'Nam', value: 'male' },
          { label: 'Nữ', value: 'female' },
          { label: 'Khác', value: 'other' },
        ],
        validation: { isRequired: true },
      }),
      hometown: text(),
      priority_type: select({
        options: [
          { label: 'Không ưu tiên', value: 'none' },
          { label: 'Con liệt sỹ', value: 'martyr_child' },
          { label: 'Con thương binh', value: 'veteran_child' },
          { label: 'Vùng sâu, vùng xa', value: 'remote_area' },
        ],
        defaultValue: 'none',
      }),
      contact_address: text(),
      email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
      phone_number: text(),
      class: relationship({
        ref: 'Class',
        ui: { displayMode: 'select', labelField: 'class_name' },
        many: false,
      }),
      account_locked: checkbox({ defaultValue: false }),
    },
    ui: {
      listView: {
        initialColumns: ['student_code', 'first_name', 'last_name', 'class', 'priority_type', 'account_locked'],
      },
    },
  }),

  Course: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      course_name: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      course_code: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      course_type: select({
        options: [
          { label: 'Lý thuyết', value: 'ly_thuyet' },
          { label: 'Thực hành', value: 'thuc_hanh' },
        ],
        validation: { isRequired: true },
        ui: { displayMode: 'segmented-control' },
      }),
      credits: integer({ validation: { isRequired: true, min: 1 } }),
      description: text(),
    },
    ui: {
      listView: {
        initialColumns: ['course_name', 'course_code', 'course_type', 'credits'],
      },
    },
  }),

  PrerequisiteCourse: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      course: relationship({
        ref: 'Course',
        ui: { displayMode: 'select', labelField: 'course_name' },
        many: false,
      }),
      prerequisite: relationship({
        ref: 'Course',
        ui: { displayMode: 'select', labelField: 'course_name' },
        many: false,
      }),
      min_grade: float({ validation: { isRequired: true, min: 0, max: 10 } }),
    },
    ui: {
      listView: {
        initialColumns: ['course', 'prerequisite', 'min_grade'],
      },
    },
  }),

  CourseResult: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      student: relationship({
        ref: 'Student',
        ui: { displayMode: 'select', labelField: 'student_code' },
        many: false,
      }),
      course: relationship({
        ref: 'Course',
        ui: { displayMode: 'select', labelField: 'course_name' },
        many: false,
      }),
      semester: relationship({
        ref: 'Semester',
        ui: { displayMode: 'select', labelField: 'semester_name' },
        many: false,
      }),
      grade: float({ validation: { min: 0, max: 10 } }),
    },
    ui: {
      listView: {
        initialColumns: ['student', 'course', 'semester', 'grade'],
      },
    },
  }),

  CourseRegistration: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff' || session?.data.role === 'student',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'academic_staff' || session?.data.role === 'student',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      student: relationship({
        ref: 'Student',
        ui: { displayMode: 'select', labelField: 'student_code' },
        many: false,
      }),
      course: relationship({
        ref: 'Course',
        ui: { displayMode: 'select', labelField: 'course_name' },
        many: false,
      }),
      semester: relationship({
        ref: 'Semester',
        ui: { displayMode: 'select', labelField: 'semester_name' },
        many: false,
      }),
      registration_date: timestamp({ defaultValue: { kind: 'now' } }),
      status: select({
        options: [
          { label: 'Đăng ký', value: 'registered' },
          { label: 'Đã hủy', value: 'cancelled' },
        ],
        defaultValue: 'registered',
      }),
    },
    hooks: {
      validateInput: async ({
        operation,
        resolvedData,
        context,
        addValidationError,
      }) => {
        if (operation === 'create') {
          const { student, course, semester } = resolvedData;

          // Lấy thông tin về sinh viên
          const studentInfo = await context.query.Student.findOne({
            where: { id: student.connect.id },
            query: 'id class { id }',
          });

          // Lấy quy định về số tín chỉ
          const creditRules = await context.query.CreditRule.findMany({
            where: {
              class: { id: { equals: studentInfo.class.id } },
              semester: { id: { equals: semester.connect.id } },
            },
            query: 'min_credits max_credits',
          });

          if (creditRules.length === 0) {
            addValidationError('Không tìm thấy quy định về số tín chỉ cho lớp và học kỳ này');
            return;
          }

          const creditRule = creditRules[0];

          // Lấy tổng số tín chỉ đã đăng ký trong học kỳ
          const registeredCredits = await context.query.CourseRegistration.findMany({
            where: {
              student: { id: { equals: student.connect.id } },
              semester: { id: { equals: semester.connect.id } },
            },
            query: 'course { credits }',
          });

          const totalCredits = registeredCredits.reduce((sum, reg) => sum + reg.course.credits, 0) + course.connect.credits;

          if (totalCredits < creditRule.min_credits) {
            addValidationError(`Tổng số tín chỉ (${totalCredits}) không đủ. Tối thiểu là ${creditRule.min_credits} tín chỉ.`);
          }

          if (totalCredits > creditRule.max_credits) {
            addValidationError(`Tổng số tín chỉ (${totalCredits}) vượt quá giới hạn. Tối đa là ${creditRule.max_credits} tín chỉ.`);
          }

          // Kiểm tra môn tiên quyết
          const prerequisites = await context.query.PrerequisiteCourse.findMany({
            where: { course: { id: { equals: course.connect.id } } },
            query: 'prerequisite { id course_name }',
          });

          for (const prereq of prerequisites) {
            const result = await context.query.CourseResult.findMany({
              where: {
                student: { id: { equals: student.connect.id } },
                course: { id: { equals: prereq.prerequisite.id } },
              },
              query: 'grade',
            });

            if (result.length === 0 || parseFloat(result[0].grade) < 5) {
              addValidationError(`Sinh viên chưa đạt điểm yêu cầu cho môn học tiên quyết ${prereq.prerequisite.course_name}`);
            }
          }

          // Kiểm tra thời hạn đăng ký
          const semesterInfo = await context.query.Semester.findOne({
            where: { id: semester.connect.id },
            query: 'registration_start registration_end',
          });

          const currentDate = new Date();
          if (currentDate < new Date(semesterInfo.registration_start) || currentDate > new Date(semesterInfo.registration_end)) {
            addValidationError('Ngoài thời hạn đăng ký học phần');
          }
        }
      },
      afterOperation: async ({ operation, item, context }) => {
        if (operation === 'create') {
          const registration = await context.query.CourseRegistration.findOne({
            where: { id: item.id },
            query: `
              id
              student { id }
              course { id credits course_type }
              semester { id }
            `,
          });

          // Lấy mức phí cho loại khóa học
          const feeRates = await context.query.FeeRate.findMany({
            where: { course_type: { equals: registration.course.course_type } },
            query: 'id fee_per_credit',
          });

          if (feeRates.length === 0) {
            console.error(`Không tìm thấy mức phí cho loại khóa học: ${registration.course.course_type}`);
            return;
          }

          const feeRate = feeRates[0];

          // Tính toán học phí cho khóa học này
          const courseFee = registration.course.credits * feeRate.fee_per_credit;

          // Tìm TuitionFee hiện có
          const existingTuitionFee = await context.query.TuitionFee.findMany({
            where: {
              student: { id: { equals: registration.student.id } },
              semester: { id: { equals: registration.semester.id } },
            },
            query: 'id total_credits tuition_fee',
          });

          if (existingTuitionFee.length > 0) {
            // Cập nhật TuitionFee hiện có
            const currentTuitionFee = existingTuitionFee[0];
            await context.query.TuitionFee.updateOne({
              where: { id: currentTuitionFee.id },
              data: {
                total_credits: currentTuitionFee.total_credits + registration.course.credits,
                tuition_fee: currentTuitionFee.tuition_fee + courseFee,
              },
            });
          } else {
            // Tạo mới TuitionFee nếu chưa tồn tại
            await context.query.TuitionFee.createOne({
              data: {
                student: { connect: { id: registration.student.id } },
                semester: { connect: { id: registration.semester.id } },
                total_credits: registration.course.credits,
                tuition_fee: courseFee,
                payment_status: 'unpaid',
              },
            });
          }
        }
      },
    },
    ui: {
      listView: {
        initialColumns: ['student', 'course', 'semester', 'registration_date', 'status'],
      },
    },
  }),

  TuitionFee: list({
    access: {
      operation: {
        query: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      student: relationship({
        ref: 'Student',
        ui: { displayMode: 'select', labelField: 'student_code' },
        many: false,
      }),
      semester: relationship({
        ref: 'Semester',
        ui: { displayMode: 'select', labelField: 'semester_name' },
        many: false,
      }),
      total_credits: integer({ validation: { isRequired: true, min: 0 } }),
      tuition_fee: float({ validation: { isRequired: true, min: 0 } }),
      discount: float({ validation: { min: 0 } }),
      amount_paid: float({ validation: { min: 0 } }),
      payment_status: select({
        options: [
          { label: 'Chưa thanh toán', value: 'unpaid' },
          { label: 'Đã thanh toán một phần', value: 'partially_paid' },
          { label: 'Đã thanh toán', value: 'paid' },
        ],
        defaultValue: 'unpaid',
      }),
      discount_details: text(),
    },
    hooks: {
      resolveInput: async ({ operation, inputData, item, context }) => {
        if (operation === 'create' || operation === 'update') {
          let studentId, semesterId;
          if (operation === 'create') {
            studentId = inputData.student.connect.id;
            semesterId = inputData.semester.connect.id;
          } else {
            const existingTuitionFee = await context.query.TuitionFee.findOne({
              where: { id: item.id },
              query: 'student { id } semester { id }',
            });
            studentId = existingTuitionFee.student.id;
            semesterId = existingTuitionFee.semester.id;
          }

          const student = await context.query.Student.findOne({
            where: { id: studentId },
            query: 'id priority_type',
          });

          const semester = await context.query.Semester.findOne({
            where: { id: semesterId },
            query: 'id payment_deadline',
          });

          let discounts = [];

          // Kiểm tra nộp sớm
          const currentDate = new Date();
          if (currentDate < new Date(semester.payment_deadline)) {
            discounts.push({ type: 'early_payment', percent: 5 });
          }

          // Áp dụng giảm giá theo diện ưu tiên
          switch (student.priority_type) {
            case 'martyr_child':
              discounts.push({ type: 'martyr_child', percent: 50 });
              break;
            case 'veteran_child':
              discounts.push({ type: 'veteran_child', percent: 30 });
              break;
            case 'remote_area':
              discounts.push({ type: 'remote_area', percent: 20 });
              break;
          }

          const totalDiscountPercent = discounts.reduce((total, discount) => total + discount.percent, 0);
          const discountAmount = (inputData.tuition_fee * totalDiscountPercent) / 100;

          let paymentStatus = 'unpaid';
          if (inputData.amount_paid >= (inputData.tuition_fee - discountAmount)) {
            paymentStatus = 'paid';
          } else if (inputData.amount_paid > 0) {
            paymentStatus = 'partially_paid';
          }

          // Kiểm tra và tạo báo cáo nợ học phí nếu quá hạn thanh toán
          if (currentDate > new Date(semester.payment_deadline) && paymentStatus !== 'paid') {
            const debtAmount = inputData.tuition_fee - discountAmount - inputData.amount_paid;
            
            // Kiểm tra xem đã có báo cáo nợ cho sinh viên này trong học kỳ này chưa
            const existingReport = await context.query.DebtReport.findMany({
              where: {
                student: { id: { equals: studentId } },
                semester: { id: { equals: semesterId } },
              },
            });

            if (existingReport.length === 0) {
              // Nếu chưa có báo cáo, tạo mới
              await context.query.DebtReport.createOne({
                data: {
                  student: { connect: { id: studentId } },
                  semester: { connect: { id: semesterId } },
                  debt_amount: debtAmount,
                },
              });
            } else {
              // Nếu đã có báo cáo, cập nhật số tiền nợ
              await context.query.DebtReport.updateOne({
                where: { id: existingReport[0].id },
                data: { debt_amount: debtAmount },
              });
            }
          }

          return {
            ...inputData,
            discount: discountAmount,
            discount_details: JSON.stringify(discounts),
            payment_status: paymentStatus,
          };
        }
        return inputData;
      },
    },
    ui: {
      listView: {
        initialColumns: ['student', 'semester', 'total_credits', 'tuition_fee', 'discount', 'amount_paid', 'payment_status'],
      },
    },
  }),

  CreditRule: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin',
        update: ({ session }) => session?.data.role === 'admin',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      class: relationship({
        ref: 'Class',
        ui: { displayMode: 'select', labelField: 'class_name' },
        many: false,
      }),
      semester: relationship({
        ref: 'Semester',
        ui: { displayMode: 'select', labelField: 'semester_name' },
        many: false,
      }),
      min_credits: integer({ validation: { isRequired: true, min: 0 } }),
      max_credits: integer({ validation: { isRequired: true, min: 0 } }),
    },
    ui: {
      listView: {
        initialColumns: ['class', 'semester', 'min_credits', 'max_credits'],
      },
    },
  }),

  FeeRate: list({
    access: {
      operation: {
        query: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      course_type: select({
        options: [
          { label: 'Lý thuyết', value: 'ly_thuyet' },
          { label: 'Thực hành', value: 'thuc_hanh' },
        ],
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      fee_per_credit: float({ validation: { isRequired: true, min: 0 } }),
    },
    ui: {
      listView: {
        initialColumns: ['course_type', 'fee_per_credit'],
      },
    },
  }),

  DebtReport: list({
    access: {
      operation: {
        query: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff' || session?.data.role === 'academic_staff',
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      student: relationship({
        ref: 'Student',
        ui: { displayMode: 'select', labelField: 'student_code' },
        many: false,
      }),
      semester: relationship({
        ref: 'Semester',
        ui: { displayMode: 'select', labelField: 'semester_name' },
        many: false,
      }),
      debt_amount: float({ validation: { isRequired: true, min: 0 } }),
      report_date: timestamp({ defaultValue: { kind: 'now' } }),
    },
    ui: {
      listView: {
        initialColumns: ['student', 'semester', 'debt_amount', 'report_date'],
      },
    },
  }),
};