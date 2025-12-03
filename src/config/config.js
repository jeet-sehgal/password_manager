const config={
    backend_url:String(import.meta.env.VITE_APPWRITE_URL),
    backend_project_id:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    backend_database_id:String(import.meta.env.VITE_APPWRITE_DATABASE),
    backend_password_table:String(import.meta.env.VITE_APPWRITE_PASSWORD_TABLE),
    backend_secret_key:String(import.meta.env.VITE_SECRET_KEY),
    
}

export default config