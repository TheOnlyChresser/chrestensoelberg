"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/client"
import Button from "@/components/ChresserComponents/ui/Button"
import { Input } from "@/components/ChresserComponents/ui/Input"
import { RealtimeChat } from "@/components/realtime-chat"
import { Mail, User, BookUser, Phone, MapPin, Save, X, ArrowLeft, Edit, Copy, Calendar, DollarSign, Package, Clock, Trash2, Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Customer {
  id: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerAddress?: string
  createdAt?: string
}

interface Order {
  id: string
  customerId: string
  productName: string
  productPrice: string
  status: string
  deadline: string
  expectedTime?: number
  createdAt?: string
  updatedAt?: string
}

interface TimeEntry {
  id: string
  order_id: string
  customer_id: string
  hours_spent: number
  description: string
  date: string
  created_at?: string
}

export default function CustomerDetailPage() {
  const params = useParams()
  const customerId = params?.customerId as string
  const supabase = createClient()

  const [customer, setCustomer] = useState<Customer | null>(null)
  const [customerOrders, setCustomerOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState<Customer | null>(null)
  const [copied, setCopied] = useState(false)
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [newTimeEntry, setNewTimeEntry] = useState<{ orderId: string; hoursSpent: string; description: string; date: string }>({
    orderId: "",
    hoursSpent: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if (customerId) {
      fetchCustomer()
      fetchTimeEntries()
    }
  }, [customerId])

  const fetchCustomer = async () => {
    try {
      if (!customerId) {
        setLoading(false)
        return
      }

      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .select()
        .eq("id", customerId)
        .single()

      if (customerError || !customerData) {
        console.error("Error fetching customer:", customerError)
        setLoading(false)
        return
      }
      
      setCustomer(customerData)
      setEditData(customerData)

      const { data: ordersData } = await supabase
        .from("orders")
        .select()
        .eq("customerId", customerId)

      setCustomerOrders(ordersData || [])
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editData) return

    try {
      const { error } = await supabase
        .from("customers")
        .update({
          customerName: editData.customerName,
          customerEmail: editData.customerEmail,
          customerPhone: editData.customerPhone,
          customerAddress: editData.customerAddress,
        })
        .eq("id", editData.id)

      if (error) {
        console.error("Error updating customer:", error)
        alert("Fejl ved opdatering af kunde")
      } else {
        setCustomer(editData)
        setEditMode(false)
        alert("Kunde opdateret")
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Fejl ved opdatering")
    }
  }

  const handleCancel = () => {
    setEditMode(false)
    setEditData(customer)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEditOrder = (order: Order) => {
    setEditingOrderId(order.id)
    setEditingOrder({ ...order })
  }

  const handleSaveOrder = async () => {
    if (!editingOrder) return

    try {
      const { error } = await supabase
        .from("orders")
        .update({
          productName: editingOrder.productName,
          productPrice: editingOrder.productPrice,
          status: editingOrder.status,
          deadline: editingOrder.deadline,
          expectedTime: editingOrder.expectedTime,
        })
        .eq("id", editingOrder.id)

      if (error) {
        console.error("Error updating order:", error)
        alert("Fejl ved opdatering af ordre")
      } else {
        setCustomerOrders(customerOrders.map(o => o.id === editingOrder.id ? editingOrder : o))
        setEditingOrderId(null)
        setEditingOrder(null)
        alert("Ordre opdateret")
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Fejl ved opdatering")
    }
  }

  const handleCancelOrderEdit = () => {
    setEditingOrderId(null)
    setEditingOrder(null)
  }

  const fetchTimeEntries = async () => {
    try {
      if (!customerId) return

      const { data } = await supabase
        .from("time_entries")
        .select()
        .eq("customer_id", customerId)
        .order("date", { ascending: false })

      setTimeEntries(data || [])
    } catch (err) {
      console.error("Error fetching time entries:", err)
    }
  }

  const handleAddTimeEntry = async () => {
    if (!newTimeEntry.orderId || !newTimeEntry.hoursSpent || !newTimeEntry.date) {
      alert("Alle felter skal udfyldes")
      return
    }

    try {
      const { data, error } = await supabase
        .from("time_entries")
        .insert([
          {
            order_id: newTimeEntry.orderId,
            customer_id: customerId,
            hours_spent: parseFloat(newTimeEntry.hoursSpent),
            description: newTimeEntry.description,
            date: newTimeEntry.date,
          },
        ])
        .select()

      if (error) {
        console.error("Error adding time entry:", error)
        alert("Fejl ved tilføjelse af tidsregistrering")
      } else {
        setTimeEntries([...(data || []), ...timeEntries])
        setNewTimeEntry({
          orderId: "",
          hoursSpent: "",
          description: "",
          date: new Date().toISOString().split("T")[0],
        })
        alert("Tidsregistrering tilføjet")
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Fejl ved tilføjelse af tidsregistrering")
    }
  }

  const handleDeleteTimeEntry = async (entryId: string) => {
    if (!confirm("Er du sikker?")) return

    try {
      const { error } = await supabase
        .from("time_entries")
        .delete()
        .eq("id", entryId)

      if (error) {
        console.error("Error deleting time entry:", error)
        alert("Fejl ved sletning")
      } else {
        setTimeEntries(timeEntries.filter(e => e.id !== entryId))
      }
    } catch (err) {
      console.error("Error:", err)
      alert("Fejl ved sletning")
    }
  }

  const getOrderTotalHours = (orderId: string) => {
    return timeEntries
      .filter(e => e.order_id === orderId)
      .reduce((sum, e) => sum + e.hours_spent, 0)
  }

  if (loading) {
    return (
      <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Indlæser...</p>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="w-full h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Kunde ikke fundet</p>
        <Link href="/info/admin">
          <Button
            type="button"
            className="px-4 py-2 w-fit"
            button="normal"
            size="form-md"
          >
            <ArrowLeft size={18} className="mr-2" />
            Tilbage
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/info/admin" className="w-fit">
                <button className="inline-flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ArrowLeft size={20} className="text-gray-600" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {customer.customerName}
                </h1>
                <p className="text-sm text-gray-500">{customer.customerEmail}</p>
              </div>
            </div>
            <div className="w-fit">
              {!editMode && (
                <Button
                  type="button"
                  className="px-4 py-2 w-fit inline-flex items-center gap-2"
                  button="normal"
                  size="form-md"
                  onClick={() => setEditMode(true)}
                >
                  <Edit size={18} />
                  Rediger
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Hurtig Info</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <BookUser size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Kunde ID</p>
                    <p className="text-sm font-mono text-gray-900 truncate">{customer.id}</p>
                    <button
                      onClick={() => copyToClipboard(customer.id)}
                      className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                    >
                      {copied ? "Kopieret!" : "Kopier"}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">E-mail</p>
                    <p className="text-sm text-gray-900 truncate">{customer.customerEmail}</p>
                  </div>
                </div>

                {customer.customerPhone && (
                  <div className="flex items-start gap-3">
                    <Phone size={16} className="text-purple-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Telefon</p>
                      <p className="text-sm text-gray-900">{customer.customerPhone}</p>
                    </div>
                  </div>
                )}

                {customer.customerAddress && (
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Adresse</p>
                      <p className="text-sm text-gray-900">{customer.customerAddress}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Package size={16} className="text-blue-600" />
                  <p className="text-xs text-blue-600 font-semibold">Ordrer</p>
                </div>
                <p className="text-2xl font-bold text-blue-900">{customerOrders.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={16} className="text-green-600" />
                  <p className="text-xs text-green-600 font-semibold">Total</p>
                </div>
                <p className="text-2xl font-bold text-green-900">
                  {customerOrders.reduce((sum, order) => sum + parseFloat(order.productPrice || "0"), 0).toFixed(0)}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-purple-600" />
                  <p className="text-xs text-purple-600 font-semibold">Timer i alt</p>
                </div>
                <p className="text-2xl font-bold text-purple-900">
                  {timeEntries.reduce((sum, e) => sum + e.hours_spent, 0).toFixed(1)}t
                </p>
              </div>
            </div>

            {customerOrders.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Package size={16} className="text-gray-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Ordrer</h3>
                  <span className="ml-auto text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {customerOrders.length}
                  </span>
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {customerOrders.map((order) => (
                    <div key={order.id}>
                      {editingOrderId === order.id ? (
                        <div className="border border-blue-300 rounded p-3 bg-blue-50">
                          <div className="space-y-3">
                            <div>
                              <label className="text-xs text-gray-600 block mb-1 font-semibold">
                                Produktnavn
                              </label>
                              <Input
                                type="text"
                                value={editingOrder?.productName || ""}
                                onChange={(e) =>
                                  setEditingOrder({
                                    ...editingOrder!,
                                    productName: (e.target as HTMLInputElement).value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs text-gray-600 block mb-1 font-semibold">
                                  Pris
                                </label>
                                <Input
                                  type="number"
                                  value={editingOrder?.productPrice || ""}
                                  onChange={(e) =>
                                    setEditingOrder({
                                      ...editingOrder!,
                                      productPrice: (e.target as HTMLInputElement).value,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <label className="text-xs text-gray-600 block mb-1 font-semibold">
                                  Forventet timer
                                </label>
                                <Input
                                  type="number"
                                  step="0.5"
                                  min="0"
                                  placeholder="f.eks. 10"
                                  value={editingOrder?.expectedTime || ""}
                                  onChange={(e) =>
                                    setEditingOrder({
                                      ...editingOrder!,
                                      expectedTime: parseFloat((e.target as HTMLInputElement).value) || 0,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 block mb-1 font-semibold">
                                Status
                              </label>
                              <select
                                value={editingOrder?.status || ""}
                                onChange={(e) =>
                                  setEditingOrder({
                                    ...editingOrder!,
                                    status: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">Vælg status</option>
                                <option value="Planlagt">Planlagt</option>
                                <option value="I gang">I gang</option>
                                <option value="Afsluttet">Afsluttet</option>
                                <option value="Under revision">Under revision</option>
                                <option value="Afventer godkendelse">Afventer godkendelse</option>
                                <option value="Leveret">Leveret</option>
                                <option value="Aflyst">Aflyst</option>
                              </select>
                            </div>
                            <div className="flex gap-2 pt-2">
                              <button
                                onClick={handleSaveOrder}
                                className="flex-1 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors"
                              >
                                Gem
                              </button>
                              <button
                                onClick={handleCancelOrderEdit}
                                className="flex-1 px-2 py-1 bg-gray-300 text-gray-700 text-xs font-semibold rounded hover:bg-gray-400 transition-colors"
                              >
                                Annuller
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="border border-gray-200 rounded p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-gray-900">{order.productName}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">Status:</span>
                                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-2">
                                Pris: <span className="font-semibold">{order.productPrice} kr</span>
                              </p>
                              {order.expectedTime && (
                                <p className="text-xs text-gray-600 mt-1">
                                  Forventet: <span className="font-semibold">{order.expectedTime}t</span>
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => handleEditOrder(order)}
                              className="ml-2 p-1 text-gray-500 hover:text-blue-600 transition-colors"
                              title="Rediger ordre"
                            >
                              <Edit size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3 space-y-6">
            {editMode && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Rediger Kunde Information</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm text-gray-600 block mb-2 font-semibold">
                      Navn
                    </label>
                    <Input
                      type="text"
                      value={editData?.customerName || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData!,
                          customerName: (e.target as HTMLInputElement).value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-2 font-semibold">
                      E-mail
                    </label>
                    <Input
                      type="email"
                      value={editData?.customerEmail || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData!,
                          customerEmail: (e.target as HTMLInputElement).value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-2 font-semibold">
                      Telefon
                    </label>
                    <Input
                      type="tel"
                      value={editData?.customerPhone || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData!,
                          customerPhone: (e.target as HTMLInputElement).value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-2 font-semibold">
                      Adresse
                    </label>
                    <Input
                      type="text"
                      value={editData?.customerAddress || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData!,
                          customerAddress: (e.target as HTMLInputElement).value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-2 w-fit">
                  <Button
                    type="button"
                    className="px-3 py-1 w-fit inline-flex items-center gap-1 text-sm"
                    button="normal"
                    size="form-md"
                    onClick={handleSaveEdit}
                  >
                    <Save size={14} />
                    Gem
                  </Button>
                  <Button
                    type="button"
                    className="px-3 py-1 w-fit inline-flex items-center gap-1 text-sm"
                    button="normal"
                    size="form-md"
                    onClick={handleCancel}
                  >
                    <X size={14} />
                    Annuller
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Beskeder</h3>
              <p className="text-xs text-gray-500 mb-4">Vælg en ordre for at sende beskeder</p>
              {customerOrders.length > 0 ? (
                <div className="space-y-3">
                  {customerOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded p-3">
                      <p className="text-sm font-semibold mb-2">{order.productName}</p>
                      <div className="h-64 overflow-hidden rounded bg-gray-50 mb-2">
                        <RealtimeChat
                          roomName={order.id}
                          username="Chresten"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm py-8">
                  Ingen ordrer for denne kunde
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-gray-600" />
                <h3 className="text-lg font-semibold">Tidsregistrering</h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                <h4 className="text-sm font-semibold mb-4 text-gray-900">Tilføj tidsregistrering</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-2 font-semibold">
                      Ordre
                    </label>
                    <select
                      value={newTimeEntry.orderId}
                      onChange={(e) =>
                        setNewTimeEntry({ ...newTimeEntry, orderId: (e.target as HTMLSelectElement).value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Vælg ordre</option>
                      {customerOrders
                        .filter((order) => order.status !== "Afsluttet")
                        .map((order) => (
                        <option key={order.id} value={order.id}>
                          {order.productName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-2 font-semibold">
                      Timer
                    </label>
                    <Input
                      type="number"
                      step="0.5"
                      min="0"
                      placeholder="f.eks. 2.5"
                      value={newTimeEntry.hoursSpent}
                      onChange={(e) =>
                        setNewTimeEntry({ ...newTimeEntry, hoursSpent: (e.target as HTMLInputElement).value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-2 font-semibold">
                      Dato
                    </label>
                    <Input
                      type="date"
                      value={newTimeEntry.date}
                      onChange={(e) =>
                        setNewTimeEntry({ ...newTimeEntry, date: (e.target as HTMLInputElement).value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-2 font-semibold">
                      Beskrivelse
                    </label>
                    <Input
                      type="text"
                      placeholder="f.eks. Design, udvikling, test"
                      value={newTimeEntry.description}
                      onChange={(e) =>
                        setNewTimeEntry({ ...newTimeEntry, description: (e.target as HTMLInputElement).value })
                      }
                    />
                  </div>
                </div>
                <div className="w-fit">
                  <Button
                    type="button"
                    className="px-4 py-2 w-fit inline-flex items-center gap-2"
                    button="normal"
                    size="form-md"
                    onClick={handleAddTimeEntry}
                    disabled={!newTimeEntry.orderId || customerOrders.find(o => o.id === newTimeEntry.orderId)?.status === "Afsluttet"}
                  >
                    <Plus size={18} />
                    Tilføj tidsregistrering
                  </Button>
                </div>
              </div>

              {customerOrders.filter(o => o.status === "Afsluttet").length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-800 font-semibold mb-2">✓ Afsluttede ordrer</p>
                  <p className="text-xs text-green-700">
                    Disse ordrer er færdige og kan ikke få tilføjet mere tidsregistrering:
                  </p>
                  <div className="mt-2 space-y-1">
                    {customerOrders
                      .filter(o => o.status === "Afsluttet")
                      .map(o => (
                        <p key={o.id} className="text-xs text-green-700 ml-2">
                          • {o.productName}
                        </p>
                      ))
                    }
                  </div>
                </div>
              )}

              {timeEntries.length > 0 ? (
                <div className="space-y-3">
                  {customerOrders.map((order) => {
                    const orderTimeEntries = timeEntries.filter(
                      (entry) => entry.order_id === order.id
                    )
                    const totalHours = getOrderTotalHours(order.id)

                    if (orderTimeEntries.length === 0) return null

                    return (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {order.productName}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {orderTimeEntries.length} registreringer
                            </p>
                            {order.expectedTime && (
                              <p className="text-xs text-gray-600 mt-1">
                                Forventet: <span className="font-semibold">{order.expectedTime}t</span>
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">
                              {totalHours.toFixed(1)}t
                            </p>
                            <p className="text-xs text-gray-500">timer i alt</p>
                            {order.expectedTime && (
                              <p className={`text-xs font-semibold mt-1 ${
                                totalHours > order.expectedTime 
                                  ? 'text-red-600' 
                                  : totalHours >= order.expectedTime * 0.9
                                  ? 'text-orange-600'
                                  : 'text-green-600'
                              }`}>
                                {((totalHours / order.expectedTime) * 100).toFixed(0)}% brugt
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {orderTimeEntries.map((entry) => (
                            <div
                              key={entry.id}
                              className="bg-white rounded p-3 flex items-start justify-between border border-gray-100"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-gray-900">
                                    {entry.hours_spent}t
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(entry.date).toLocaleDateString("da-DK")}
                                  </span>
                                </div>
                                {entry.description && (
                                  <p className="text-sm text-gray-600 mt-1">
                                    {entry.description}
                                  </p>
                                )}
                              </div>
                              <button
                                onClick={() => handleDeleteTimeEntry(entry.id)}
                                className="ml-2 p-1 text-gray-400 hover:text-red-600 transition-colors"
                                title="Slet"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-500 text-sm py-8">
                  Ingen tidsregistreringer endnu
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
