// export const baseUrl = 'http://localhost:2010'
const isProd = process.env.NODE_ENV == "production"
export const baseUrl = isProd ? 'https://portfolio-api-i3t0.onrender.com' : 'http://localhost:2010'

export const user_key = '__chave_user'

export const project_key = '__chave_project'