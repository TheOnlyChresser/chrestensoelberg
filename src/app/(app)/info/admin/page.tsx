"use client"

import {useState, useEffect, ChangeEvent} from "react"
import { createClient } from "@/lib/client"
import Button from "@/components/ChresserComponents/ui/Button"
import { Input } from "@/components/ChresserComponents/ui/Input"
import { Mail, User, LogOut, Search } from "lucide-react"
import Link from "next/link"

interface Customer {
  id: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerAddress?: string
  createdAt?: string
}

export default function AdminHome() {
  const supabase = createClient()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [adminPassword, setAdminPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // tjekker om de er autoriseret
  useEffect(() => {
    const cachedAuth = localStorage.getItem("adminAuthenticated") === "true"
    if (cachedAuth) {
      setIsAuthenticated(true)
      fetchCustomers()
    } else {
      setLoading(false)
    }
  }, [])

  // fetcher kunder fra database
  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase.from("customers").select()
      if (error) {
        console.error("Error fetching customers:", error)
      } else {
        setCustomers(data || [])
        setFilteredCustomers(data || [])
      }
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  // filter kunder
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCustomers(customers)
    } else {
      const query = searchQuery.toLowerCase()
      setFilteredCustomers(
        customers.filter(
          (customer) =>
            customer.customerName.toLowerCase().includes(query) ||
            customer.customerEmail.toLowerCase().includes(query) ||
            customer.id.toLowerCase().includes(query)
        )
      )
    }
  }, [searchQuery, customers])

  const handleAdminLogin = async () => {
    if (adminPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem("adminAuthenticated", "true")
      fetchCustomers()
    } else {
      alert("Forkert adgangskode")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuthenticated")
    setCustomers([])
    setFilteredCustomers([])
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-sm border border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-center">Admin Panel</h2>
          <p className="text-gray-500 text-center mb-6">
            Log ind med admin adgangskoden
          </p>
          <Input
            type="password"
            className="mb-4"
            value={adminPassword}
            onChange={(e) => setAdminPassword((e.target as HTMLInputElement).value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
          >
            Adgangskode
          </Input>
          <Button
            type="submit"
            className="w-full px-4 py-2"
            button="normal"
            size="form-md"
            onClick={handleAdminLogin}
          >
            Log ind
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-1">Administrer dine kunder</p>
            </div>
            <div className="w-fit">
              <Button
                type="button"
                className="px-4 py-2 w-fit inline-flex items-center gap-2"
                button="normal"
                size="form-md"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Log ud
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <Input
              type="text"
              className="pl-10"
              placeholder="Søg efter kunde navn, e-mail eller ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? "Indlæser..." : `${filteredCustomers.length} kunde${filteredCustomers.length !== 1 ? "r" : ""}`}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <p className="text-gray-500 text-lg">Indlæser kunder...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-2">
                {customers.length === 0 ? "Ingen kunder fundet" : "Ingen resultater"}
              </p>
              {searchQuery && (
                <Button
                  type="button"
                  className="px-4 py-2 mt-4"
                  button="normal"
                  size="form-md"
                  onClick={() => setSearchQuery("")}
                >
                  Nulstil søgning
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCustomers.map((customer) => (
              <Link
                key={customer.id}
                href={`/info/admin/${customer.id}`}
              >
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full hover:border-blue-300 group">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {customer.customerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {customer.customerName}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Mail size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600 break-all">
                        {customer.customerEmail}
                      </p>
                    </div>

                    {customer.customerPhone && (
                      <div className="flex items-start gap-2">
                        <User size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">
                          {customer.customerPhone}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      ID: {customer.id.substring(0, 8)}...
                    </p>
                  </div>

                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full group-hover:bg-blue-200 transition-colors">
                      Administrer →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
