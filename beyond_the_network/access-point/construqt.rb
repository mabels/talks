require_relative "../core_net"

require_relative "./distil_wifi_ap.rb"

core_net = CoreNet.setup
distil_wifi_ap(core_net)
core_net.produce
