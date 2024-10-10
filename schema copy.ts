// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  integer,
  float,
} from '@keystone-6/core/fields'

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document'
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import { type Lists } from '.keystone/types'

export const lists: Lists = {
  User: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data, // Cho phép tất cả người dùng đã đăng nhập truy vấn
        create: ({ session }) => session?.data?.role === 'admin', // Chỉ admin mới có thể tạo
        update: ({ session }) => session?.data?.role === 'admin', // Chỉ admin mới có thể cập nhật
        delete: ({ session }) => session?.data?.role === 'admin', // Chỉ admin mới có thể xóa
      },
    },

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      // we can use this field to see what Posts this User has authored
      //   more on that in the Post list below
      posts: relationship({ ref: 'Post.author', many: true }),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
      }),

      role: select({
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'Nhân viên phòng tài vụ', value: 'finance_staff' },
          { label: 'Nhân viên phòng giáo vụ', value: 'academic_staff' },
          { label: 'Sinh viên', value: 'student' },
        ],
        defaultValue: 'student',
        ui: {
          displayMode: 'segmented-control',
        },
      }),
    },
    ui: {
      listView: {
        initialColumns: ['name', 'email', 'role', 'createdAt'],
      },
    },
  }),

  Post: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our Post list
    fields: {
      title: text({ validation: { isRequired: true } }),

      // the document field can be used for making rich editable content
      //   you can find out more at https://keystonejs.com/docs/guides/document-fields
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 2, 1],
        ],
        links: true,
        dividers: true,
      }),

      // with this field, you can set a User as the author for a Post
      author: relationship({
        // we could have used 'User', but then the relationship would only be 1-way
        ref: 'User.posts',

        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: 'cards',
          cardFields: ['name', 'email'],
          inlineEdit: { fields: ['name', 'email'] },
          linkToItem: true,
          inlineConnect: true,
        },

        // a Post can only have one author
        //   this is the default, but we show it here for verbosity
        many: false,
      }),

      // with this field, you can add some Tags to Posts
      tags: relationship({
        // we could have used 'Tag', but then the relationship would only be 1-way
        ref: 'Tag.posts',

        // a Post can have many Tags, not just one
        many: true,

        // this is some customisations for changing how this will look in the AdminUI
        ui: {
          displayMode: 'cards',
          cardFields: ['name'],
          inlineEdit: { fields: ['name'] },
          linkToItem: true,
          inlineConnect: true,
          inlineCreate: { fields: ['name'] },
        },
      }),
    },
    ui: {
      listView: {
        initialColumns: ['title', 'author', 'tags'],
      },
    },
  }),

  // this last list is our Tag list, it only has a name field for now
  Tag: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
    ui: {
      isHidden: true,
    },

    // this is the fields for our Tag list
    fields: {
      name: text(),
      // this can be helpful to find out all the Posts associated with a Tag
      posts: relationship({ ref: 'Post.tags', many: true }),
    },
  }),

  Department: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin',
        update: ({ session }) => session?.data.role === 'admin',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      department_name: text({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['department_name'],
      },
    },
  }),

  Major: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin',
        update: ({ session }) => session?.data.role === 'admin',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      major_name: text({ validation: { isRequired: true } }),
      department: relationship({
        ref: 'Department',
        ui: {
          displayMode: 'select',
          labelField: 'department_name',
        },
        many: false,
      }),
    },
    ui: {
      listView: {
        initialColumns: ['major_name', 'department'],
      },
    },
  }),

  Class: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin',
        update: ({ session }) => session?.data.role === 'admin',
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

  Employee: list({
    access: {
      operation: {
        query: ({ session }) => !!session?.data,
        create: ({ session }) => session?.data.role === 'admin',
        update: ({ session }) => session?.data.role === 'admin',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      first_name: text({ validation: { isRequired: true } }),
      last_name: text({ validation: { isRequired: true } }),
      date_of_birth: timestamp({ validation: { isRequired: true } }),
      hire_date: timestamp({ validation: { isRequired: true } }),
      job_title: text({ validation: { isRequired: true } }),
      department: relationship({
        ref: 'Department',
        ui: { displayMode: 'select', labelField: 'department_name' },
        many: false,
      }),
      manager: relationship({
        ref: 'Employee',
        ui: { displayMode: 'select', labelField: 'last_name' },
        many: false,
      }),
      salary: float({ validation: { isRequired: true } }),
      email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
      address: text(),
      phone_number: text(),
      created_at: timestamp({ defaultValue: { kind: 'now' } }),
      updated_at: timestamp({ defaultValue: { kind: 'now' }, db: { updatedAt: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['first_name', 'last_name', 'job_title', 'department', 'manager'],
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
        initialColumns: ['course_name', 'course_type', 'credits'],
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
    },
    ui: {
      listView: {
        initialColumns: ['course', 'prerequisite'],
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
      registration_deadline: timestamp({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['start_date', 'end_date', 'registration_deadline'],
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
      priority: text(),
      contact_address: text(),
      email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
      phone_number: text(),
      class: relationship({
        ref: 'Class',
        ui: { displayMode: 'select', labelField: 'class_name' },
        many: false,
      }),
    },
    ui: {
      listView: {
        initialColumns: ['student_code', 'first_name', 'last_name', 'date_of_birth', 'class'],
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
        ui: {
          displayMode: 'select',
          labelField: 'first_name',
        },
        many: false,
      }),
      course: relationship({
        ref: 'Course',
        ui: {
          displayMode: 'select',
          labelField: 'course_name',
        },
        many: false,
      }),
      semester: relationship({
        ref: 'Semester',
        ui: {
          displayMode: 'select',
          labelField: 'start_date',
        },
        many: false,
      }),
      grade: text(),
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

          // Lấy thông tin về môn học
          const courseInfo = await context.query.Course.findOne({
            where: { id: course.connect.id },
            query: 'id course_name',
          });

          // Lấy các môn học tiên quyết
          const prerequisites = await context.query.PrerequisiteCourse.findMany({
            where: { course: { id: { equals: course.connect.id } } },
            query: 'prerequisite { id course_name }',
          });

          // Kiểm tra điểm của các môn học tiên quyết
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
        }
      },
      afterOperation: async ({ operation, item, context }) => {
        if (operation === 'create') {
          // Lấy thông tin đầy đủ về đăng ký khóa học
          const registration = await context.query.CourseRegistration.findOne({
            where: { id: item.id },
            query: `
              id
              course {
                id
                credits
                course_type
              }
              student {
                id
              }
              semester {
                id
              }
            `,
          });

          if (!registration) {
            console.error('Không tìm thấy thông tin đăng ký khóa học');
            return;
          }

          // Lấy mức phí cho loại khóa học
          const feeRates = await context.query.FeeRate.findMany({
            where: { course_type: { equals: registration.course.course_type } },
            query: 'id fee_per_credit',
          });

          if (feeRates.length === 0) {
            console.error(`Không tìm thấy mức phí cho loại khóa học: ${registration.course.course_type}`);
            return; // Kết thúc hook nếu không tìm thấy mức phí
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
            await context.query.TuitionFee.updateOne({
              where: { id: existingTuitionFee[0].id },
              data: {
                total_credits: { increment: registration.course.credits },
                tuition_fee: { increment: courseFee },
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
        initialColumns: ['student', 'course', 'semester', 'registration_date'],
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
    },
    hooks: {
      resolveInput: async ({ operation, inputData, item, context }) => {
        if (operation === 'create' || operation === 'update') {
          let studentId;
          if (operation === 'create') {
            studentId = inputData.student.connect.id;
          } else {
            // Trong trường hợp update, chúng ta cần lấy studentId từ item hiện tại
            const existingTuitionFee = await context.query.TuitionFee.findOne({
              where: { id: item.id },
              query: 'student { id }',
            });
            studentId = existingTuitionFee.student.id;
          }

          // Lấy thông tin về các khoản giảm giá áp dụng cho sinh viên
          const discounts = await context.query.FeeDiscount.findMany({
            where: { students: { some: { id: { equals: studentId } } } },
            query: 'discount_percent',
          });

          // Tính tổng phần trăm giảm giá
          const totalDiscountPercent = discounts.reduce((total, discount) => total + discount.discount_percent, 0);

          // Tính số tiền giảm giá
          const discountAmount = (inputData.tuition_fee * totalDiscountPercent) / 100;

          // Cập nhật dữ liệu đầu vào
          return {
            ...inputData,
            discount: discountAmount,
            payment_status: inputData.amount_paid >= (inputData.tuition_fee - discountAmount) ? 'paid' : 'unpaid',
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

  FeeDiscount: list({
    access: {
      operation: {
        query: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      discount_type: text({ validation: { isRequired: true } }),
      discount_percent: float({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['discount_type', 'discount_percent'],
      },
    },
  }),

  FeePayment: list({
    access: {
      operation: {
        query: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        create: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        update: ({ session }) => session?.data.role === 'admin' || session?.data.role === 'finance_staff',
        delete: ({ session }) => session?.data.role === 'admin',
      },
    },
    fields: {
      fee: relationship({
        ref: 'TuitionFee',
        ui: {
          displayMode: 'select',
          labelField: 'student',
        },
        many: false,
      }),
      payment_date: timestamp({ validation: { isRequired: true } }),
      amount_paid: float({ validation: { isRequired: true } }),
    },
    ui: {
      listView: {
        initialColumns: ['fee', 'payment_date', 'amount_paid'],
      },
    },
  }),
};